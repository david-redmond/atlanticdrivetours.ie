# Use a lightweight Node.js image as base
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3300
ENV HOSTNAME="0.0.0.0"

# Expose the port
EXPOSE 3300

# Start the Next.js application
CMD ["npm", "start"]