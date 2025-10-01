import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
  console.info('Start seeding...');

  // Seed users
  await Promise.all(
    Array.from({ length: 5 }, async () => {
      await prisma.user.create({
        data: {
          bio: faker.person.bio(),
          displayName: faker.person.fullName(),
          email: faker.internet.email(),
          photo: faker.image.avatar(),
          username: faker.internet.userName(),
        },
      });
    }),
  );

  // Seed posts
  const posts = await Promise.all(
    Array.from({ length: 20 }, async () => {
      const index = faker.number.int({ max: 5, min: 1 });
      const user = await prisma.user.findFirstOrThrow({ skip: index - 1 });

      return prisma.post.create({
        data: {
          message: faker.lorem.sentence(),
          userId: user.id,
        },
      });
    }),
  );

  // Seed some likes
  const users = await prisma.user.findMany();
  await Promise.all(
    Array.from({ length: 30 }, async () => {
      const post = posts[faker.number.int({ max: posts.length - 1, min: 0 })];
      const user = users[faker.number.int({ max: users.length - 1, min: 0 })];

      try {
        await prisma.like.create({
          data: {
            postId: post.id,
            userId: user.id,
          },
        });
      } catch {
        // Ignore duplicate likes (unique constraint violation)
      }
    }),
  );

  // Seed some messages
  await Promise.all(
    Array.from({ length: 10 }, async () => {
      const user = users[faker.number.int({ max: users.length - 1, min: 0 })];

      await prisma.message.create({
        data: {
          content: faker.lorem.sentence(),
          userId: user.id,
        },
      });
    }),
  );

  console.info('Seeding completed!');
})();
