# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
RUN corepack enable
WORKDIR /app
ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true

# Copy workspace manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY server/package.json server/
COPY server/prisma server/prisma

# Install only the dependencies needed for the server workspace
RUN pnpm install --filter server... --frozen-lockfile

# Copy source files and build the server
COPY server server
RUN pnpm --filter server build && pnpm --filter server exec prisma generate

FROM node:20-alpine AS runner
RUN corepack enable
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000
ENV DATABASE_URL="file:/data/dev.db"

# Copy the built assets and production deps
COPY --from=base /app/package.json ./
COPY --from=base /app/pnpm-lock.yaml ./
COPY --from=base /app/pnpm-workspace.yaml ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/server ./server

EXPOSE 4000

CMD ["sh", "-c", "set -euxo pipefail; which pnpm; pnpm --version; pnpm --filter server exec -- prisma migrate deploy; pnpm --filter server run start"]
