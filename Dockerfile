# Bullseye (Debian)
FROM node:18-bullseye AS base

# 1. Bağımlılıklar
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# 2. Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build korumaları
ENV NEXT_TELEMETRY_DISABLED 1
ENV DATABASE_PATH=/app/data/database.sqlite
RUN mkdir -p /app/data && touch /app/data/database.sqlite

# Hataları yoksayma değişkenleri
ENV NEXT_PRIVATE_LOCAL_SKIP_TYPECHECK=1
ENV NEXT_PRIVATE_LOCAL_SKIP_LINT=1

# Build komutunu hatayı ekrana basacak şekilde güncelledim
RUN npm run build || { echo "--- NEXT.JS BUILD LOGS ---"; cat .next/error-log.txt 2>/dev/null || true; exit 1; }

# 3. Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN mkdir -p /app/data /app/public/uploads

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

ENTRYPOINT ["./entrypoint.sh"]
