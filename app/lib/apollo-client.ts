import { HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache, registerApolloClient } from '@apollo/client-integration-nextjs';
import { graphqlEndpoint } from './constants';

export const { getClient } = registerApolloClient(() => {
  const httpLink = new HttpLink({
    uri: graphqlEndpoint,
    fetchOptions: {
      cache: 'no-store',
      next: { revalidate: 0 },
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
});
