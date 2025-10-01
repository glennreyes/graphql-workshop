'use client';

import { graphqlEndpoint } from '@/lib/constants';
import { ApolloLink, HttpLink } from '@apollo/client';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
  SSRMultipartLink,
} from '@apollo/client-integration-nextjs';

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

  // TODO(@exercise-04): Add a GraphQL WS link and split links for subscriptions.
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
