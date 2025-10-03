import { PrismaClient } from '@prisma/client';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const defaultDbFile = resolve(__dirname, '../prisma/dev.db');
const defaultDbUrl = pathToFileURL(defaultDbFile).toString();

const ensureAbsoluteFileUrl = (value: string) => {
  if (!value.startsWith('file:')) {
    return value;
  }

  const filePath = value.slice('file:'.length);

  if (filePath.startsWith('/')) {
    return value;
  }

  const absolutePath = resolve(process.cwd(), filePath);
  return pathToFileURL(absolutePath).toString();
};

const resolveDatabaseUrl = (): string => {
  const raw = process.env.DATABASE_URL ?? defaultDbUrl;
  const normalized = ensureAbsoluteFileUrl(raw);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.info('Resolved Prisma database URL to %s', normalized);
  }

  process.env.DATABASE_URL = normalized;
  return normalized;
};

const databaseUrl = resolveDatabaseUrl();

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});
