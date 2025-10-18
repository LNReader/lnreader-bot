# Multi-stage build for lnreader-bot

# Build stage
FROM node:20-slim AS builder

# Install build dependencies for native modules
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY mikro-orm.config.ts ./

# Install dependencies
RUN npm ci --silent

# Copy source code
COPY src ./src

# Build the application
RUN npm run build

# Production stage
FROM node:20-slim

# Install runtime dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production --silent

# Copy built application from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/mikro-orm.config.ts ./mikro-orm.config.ts

# Copy assets
COPY assets ./assets

# Create necessary directories
RUN mkdir -p /app/database /app/logs

# Set environment to production
ENV NODE_ENV=production

# Start the bot
CMD ["npm", "start"]
