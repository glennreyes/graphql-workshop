export const graphqlEndpoint =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? 'http://localhost:4000/graphql';
export const graphqlWsEndpoint =
  process.env.NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT ?? 'ws://localhost:4000/graphql';
