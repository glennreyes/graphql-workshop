import { builder } from '../builder';
import { prisma } from '../prisma';

const Post = builder.prismaObject('Post', {
  fields: (t) => ({
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    id: t.exposeID('id'),
    message: t.exposeString('message'),
    user: t.relation('user'),
    likes: t.relation('likes'),
    likesCount: t.int({
      resolve: async (post) => {
        return prisma.like.count({ where: { postId: post.id } });
      },
    }),
    isLikedByMe: t.boolean({
      resolve: async (post, _args, ctx) => {
        const like = await prisma.like.findUnique({
          where: {
            postId_userId: {
              postId: post.id,
              userId: ctx.user.id,
            },
          },
        });
        return !!like;
      },
    }),
  }),
});

const Like = builder.prismaObject('Like', {
  fields: (t) => ({
    id: t.exposeID('id'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    post: t.relation('post'),
    user: t.relation('user'),
  }),
});

builder.queryField('allPosts', (t) =>
  t.field({
    resolve: () => prisma.post.findMany({ orderBy: { createdAt: 'desc' } }),
    type: [Post],
  }),
);

builder.mutationField('createPost', (t) =>
  t.field({
    args: {
      message: t.arg.string({ required: true }),
    },
    resolve: (_, args, ctx) => {
      return prisma.post.create({
        data: {
          message: args.message,
          userId: ctx.user.id,
        },
      });
    },
    type: Post,
  }),
);

builder.mutationField('deletePost', (t) =>
  t.field({
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (parent, args, ctx) => {
      const post = await prisma.post.findUniqueOrThrow({ where: { id: args.id } });

      if (ctx.user.id !== post.userId) {
        throw new Error('You are not authorized to delete this post');
      }

      await prisma.post.delete({ where: { id: args.id } });

      return true;
    },
    type: 'Boolean',
  }),
);

builder.mutationField('likePost', (t) =>
  t.field({
    args: {
      postId: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      const like = await prisma.like.upsert({
        where: {
          postId_userId: {
            postId: args.postId,
            userId: ctx.user.id,
          },
        },
        create: {
          postId: args.postId,
          userId: ctx.user.id,
        },
        update: {},
        include: {
          post: true,
        },
      });

      return like.post;
    },
    type: Post,
  }),
);

builder.mutationField('unlikePost', (t) =>
  t.field({
    args: {
      postId: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      await prisma.like.delete({
        where: {
          postId_userId: {
            postId: args.postId,
            userId: ctx.user.id,
          },
        },
      });

      const post = await prisma.post.findUniqueOrThrow({
        where: { id: args.postId },
      });

      return post;
    },
    type: Post,
  }),
);
