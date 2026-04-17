# Stage 1: full install (devDependencies needed for next build) + compile
FROM node:20-bookworm-slim AS builder

WORKDIR /usr/src

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID}

RUN npm run build

# Stage 2: minimal runtime — no TypeScript, Tailwind, ESLint, or @types in the image
FROM node:20-bookworm-slim AS runner

WORKDIR /usr/src

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Same keys as `.env.example` — override via compose / k8s / `docker run -e`
ENV RESEND_API_KEY=""
ENV EMAIL_FROM=""
ENV EMAIL_TO=""

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder /usr/src/public ./public
COPY --from=builder --chown=nextjs:nodejs /usr/src/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
