# Multi-stage build to reduce final image size
FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.17.1 --activate

WORKDIR /app

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY server/package.json ./server/
COPY app/package.json ./app/

# Copy Prisma schema before install (needed for postinstall script)
COPY server/prisma ./server/prisma

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy remaining source code
COPY . .

# Generate Prisma client
RUN cd server && pnpm prisma generate

# Seed database
RUN cd server && pnpm seed

# Build server
RUN cd server && pnpm build

# Build Next.js app with env vars
ENV NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://graphql-workshop.fly.dev/graphql
ENV NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT=wss://graphql-workshop.fly.dev/graphql
RUN cd app && pnpm build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy server dependencies and built files
COPY --from=base /app/server/dist ./server/dist
COPY --from=base /app/server/prisma ./server/prisma
COPY --from=base /app/server/node_modules ./server/node_modules
COPY --from=base /app/node_modules ./node_modules

# Copy Next.js standalone output (includes trimmed node_modules)
COPY --from=base /app/app/.next/standalone ./standalone
COPY --from=base /app/app/.next/static ./standalone/.next/static
COPY --from=base /app/app/public ./standalone/public

# Create startup script that runs both server and app
RUN printf '#!/bin/sh\nset -e\ncd /app/server && node --experimental-specifier-resolution=node dist/src/index.js &\ncd /app/standalone/app && PORT=3000 node server.js\n' > /start.sh && chmod +x /start.sh

EXPOSE 3000 4000

CMD ["/start.sh"]
