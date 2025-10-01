import { createServer } from 'node:http';
import { renderGraphiQL } from '@graphql-yoga/render-graphiql';
import type { User } from '@prisma/client';
import { createYoga } from 'graphql-yoga';
import { prisma } from './prisma';
import { schema } from './schema';

export interface Context {
  user: User;
}

const yoga = createYoga<Context>({
  context: async () => {
    // Auth logic implementation here
    // Mocking first user for now
    const user = await prisma.user.findFirstOrThrow();

    return { user };
  },
  renderGraphiQL,
  schema,
  graphiql: {
    // TODO(@exercise-04): Re-enable GraphQL WS once subscriptions are implemented.
  },
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql');
  // TODO(@exercise-04): Announce subscription endpoint once WebSocket server is wired up.
});
