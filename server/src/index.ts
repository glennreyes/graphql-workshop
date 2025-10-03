import 'dotenv/config';
import { createServer } from 'node:http';
import { renderGraphiQL } from '@graphql-yoga/render-graphiql';
import type { User } from '@prisma/client';
import { createYoga } from 'graphql-yoga';
import type { Context as GraphQLWSContext, SubscribePayload } from 'graphql-ws';
import { useServer, type Extra } from 'graphql-ws/use/ws';
import { WebSocketServer } from 'ws';
import { parse, validate } from 'graphql';
import { prisma } from './prisma.js';
import { schema } from './schema/index.js';

if (process.env.NODE_ENV !== 'production') {
  console.info('Using database URL %s', process.env.DATABASE_URL);
}

export interface Context {
  user: User;
}

const yoga = createYoga<Context>({
  context: async () => {
    const user = await prisma.user.findFirstOrThrow();
    return { user };
  },
  renderGraphiQL,
  schema,
  graphiql: {
    subscriptionsProtocol: 'WS',
  },
});

const server = createServer(yoga);

const wsServer = new WebSocketServer({
  server,
  path: yoga.graphqlEndpoint,
});

useServer(
  {
    onConnect: () => {
      console.log('WebSocket client connected');
    },
    onDisconnect: () => {
      console.log('WebSocket client disconnected');
    },
    onSubscribe: async (
      ctx: GraphQLWSContext<Record<string, unknown>, Extra>,
      _messageId,
      payload: SubscribePayload,
    ) => {
      const {
        execute,
        subscribe,
        schema: resolvedSchema,
        parse,
        validate,
        contextFactory,
      } = await yoga.getEnveloped({
        ...ctx,
        req: ctx.extra.request,
        socket: ctx.extra.socket,
        params: payload,
      });

      const document = parse(payload.query);
      const validationErrors = validate(resolvedSchema, document);

      if (validationErrors.length > 0) {
        return validationErrors;
      }

      return {
        schema: resolvedSchema,
        operationName: payload.operationName,
        document,
        variableValues: payload.variables,
        contextValue: await contextFactory(),
        execute,
        subscribe,
      };
    },
  },
  wsServer,
);

const port = Number.parseInt(process.env.PORT ?? '4000', 10);

server.listen(port, () => {
  const displayPort = Number.isFinite(port) ? port : 4000;
  console.info(`Server is running on http://localhost:${displayPort}/graphql`);
  console.info(`WebSocket subscriptions available at ws://localhost:${displayPort}/graphql`);
});
