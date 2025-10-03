import { GraphQLError } from 'graphql';
import { builder, pubSub } from '../builder.js';
import { prisma } from '../prisma.js';

const DEFAULT_MESSAGE_LIMIT = 500;
const MESSAGE_LIMIT_CODE = 'MESSAGE_HISTORY_FULL';

const getMessageLimit = () => {
  const value = Number(process.env.MESSAGE_HISTORY_LIMIT);
  if (Number.isFinite(value) && value > 0) {
    return Math.floor(value);
  }
  return DEFAULT_MESSAGE_LIMIT;
};

const createLimitError = (usage: MessageUsageShape) =>
  new GraphQLError('Message history is full. Please try again later.', {
    extensions: {
      code: MESSAGE_LIMIT_CODE,
      usage,
    },
  });

interface MessageUsageShape {
  limit: number;
  count: number;
  remaining: number;
}

const getUsage = async (): Promise<MessageUsageShape> => {
  const limit = getMessageLimit();
  const count = await prisma.message.count();

  return {
    limit,
    count,
    remaining: Math.max(limit - count, 0),
  };
};

const Message = builder.prismaObject('Message', {
  fields: (t) => ({
    id: t.exposeID('id'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    content: t.exposeString('content'),
    user: t.relation('user'),
  }),
});

builder.queryField('allMessages', (t) =>
  t.field({
    resolve: () => prisma.message.findMany({ orderBy: { createdAt: 'asc' } }),
    type: [Message],
  }),
);

builder.mutationField('sendMessage', (t) =>
  t.field({
    args: {
      content: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      const usage = await getUsage();
      if (usage.count >= usage.limit) {
        throw createLimitError(usage);
      }

      const message = await prisma.message.create({
        data: {
          content: args.content,
          userId: ctx.user.id,
        },
      });

      pubSub.publish('newMessage', message);

      return message;
    },
    type: Message,
  }),
);

builder.subscriptionField('newMessage', (t) =>
  t.field({
    type: Message,
    subscribe: () => pubSub.subscribe('newMessage'),
    resolve: (message) => message,
  }),
);

const MessageStoreStatus = builder.objectRef<MessageUsageShape>('MessageStoreStatus');

MessageStoreStatus.implement({
  fields: (t) => ({
    limit: t.int({ resolve: (usage) => usage.limit }),
    count: t.int({ resolve: (usage) => usage.count }),
    remaining: t.int({ resolve: (usage) => usage.remaining }),
  }),
});

builder.queryField('messageStoreStatus', (t) =>
  t.field({
    resolve: () => getUsage(),
    type: MessageStoreStatus,
  }),
);
