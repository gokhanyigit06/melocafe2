FROM node:18-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# 2. Rebuild the source code only when needed
FROM base AS builder
# Build stages also need generic tools for some npm scripts
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Create dummy directories to prevent DB connection errors during build
# Next.js might try to access the DB path if environment variables are passed
RUN mkdir -p /app/data /app/public/uploads && touch /app/data/database.sqlite

# Disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

# Ensure DATABASE_PATH points to our dummy file for build time
ENV DATABASE_PATH=/app/data/database.sqlite

RUN npm run build

# 3. Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create data and uploads directories for persistence (Volumes)
RUN mkdir -p /app/data /app/public/uploads

# Copy standalone build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

# Set permissions for the entrypoint
RUN chmod +x ./entrypoint.sh

# Expose port
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Use the entrypoint script to start the app
ENTRYPOINT ["./entrypoint.sh"]
