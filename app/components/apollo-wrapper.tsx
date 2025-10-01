'use client';

import { graphqlEndpoint, graphqlWsEndpoint } from '@/lib/constants';
import { ApolloLink, HttpLink, split } from '@apollo/client';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
  SSRMultipartLink,
} from '@apollo/client-integration-nextjs';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

function makeClient() {
  const httpLink = new HttpLink({
    uri: graphqlEndpoint,
    fetchOptions: {
      cache: 'no-store',
      next: { revalidate: 0 },
    },
  });

  if (typeof window === 'undefined') {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), httpLink]),
    });
  }

  const wsLink = new GraphQLWsLink(
    createClient({
      url: graphqlWsEndpoint,
      retryAttempts: Infinity,
      shouldRetry: () => true,
    }),
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
