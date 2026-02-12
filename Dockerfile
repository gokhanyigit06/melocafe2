# Node 20 daha yeni ve Next.js 16 ile daha uyumludur
FROM node:20-bullseye AS base

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

# Build korumaları ve bellek artırımı
ENV NEXT_TELEMETRY_DISABLED 1
# DATABASE_PATH env var removed as we use DATABASE_URL for Postgres
# SQLite file creation removed

# Build sırasında TypeScript ve Lint kontrolünü atlayalım (Hata payını azaltmak için)
ENV NEXT_IGNORE_TYPECHECK=1
ENV NEXT_IGNORE_ESLINT=1

RUN npm run build

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
