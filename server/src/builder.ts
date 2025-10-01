import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { PrismaClient, type Message as MessageModel } from '@prisma/client';
import { createPubSub } from 'graphql-yoga';
import type { Context } from './index';

const prisma = new PrismaClient({});
export const pubSub = createPubSub<{ newMessage: [MessageModel] }>();

export const builder = new SchemaBuilder<{
  Context: Context;
  PrismaTypes: PrismaTypes;
  Scalars: { DateTime: { Input: Date; Output: Date } };
}>({
  plugins: [PrismaPlugin],
  prisma: { client: prisma },
});
