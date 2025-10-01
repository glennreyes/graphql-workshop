import { builder, pubSub } from '../builder.js';
import { prisma } from '../prisma.js';

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
      const message = await prisma.message.create({
        data: {
          content: args.content,
          userId: ctx.user.id,
        },
      });

      // Publish the message to subscribers
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
