FROM node:20-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.17.1 --activate

WORKDIR /app

# Copy all files
COPY . .

# Install dependencies
RUN pnpm install --frozen-lockfile

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

# Copy public and static files for Next.js standalone
RUN mkdir -p /app/app/.next/standalone/.next && \
    cp -r /app/app/public /app/app/.next/standalone/public 2>/dev/null || true && \
    cp -r /app/app/.next/static /app/app/.next/standalone/.next/static

# Create startup script that runs both server and app
RUN printf '#!/bin/sh\ncd /app/server && node dist/index.js &\ncd /app/app/.next/standalone && PORT=3000 node server.js\n' > /start.sh && chmod +x /start.sh

EXPOSE 3000 4000

CMD ["/start.sh"]
