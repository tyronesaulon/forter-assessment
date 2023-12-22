import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const { VITE_GRAPHQL_URL, VITE_GRAPHQL_ADMIN_SECRET_KEY: adminSecretKey } =
  import.meta.env;

const httpLink = createHttpLink({
  uri: VITE_GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-hasura-admin-secret': adminSecretKey,
    },
  };
});

export const apollo = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
