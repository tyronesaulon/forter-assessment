import { ApolloClient, InMemoryCache } from '@apollo/client';

const { VITE_GRAPHQL_URL } = import.meta.env;

export const apollo = new ApolloClient({
  uri: VITE_GRAPHQL_URL,
  cache: new InMemoryCache(),
});
