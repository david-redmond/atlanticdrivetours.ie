# Use a lightweight Node.js image as base (bookworm-slim if alpine pull fails due to DNS/registry)
FROM node:20-bookworm-slim

# Set the working directory in the container
WORKDIR /usr/src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application (NEXT_PUBLIC_* is inlined at build time)
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID}
RUN npm run build

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3300
ENV HOSTNAME="0.0.0.0"

# Same keys as `.env.example` — Resend/email (API routes read these at runtime; override via compose / k8s / `docker run -e`)
ENV RESEND_API_KEY=""
ENV EMAIL_FROM=""
ENV EMAIL_TO=""

# Expose the port
EXPOSE 3300

# Start the Next.js application
CMD ["npm", "start"]