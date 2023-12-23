import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';

const {
  VITE_GRAPHQL_URL,
  VITE_WS_GRAPHQL_URL,
  VITE_GRAPHQL_ADMIN_SECRET_KEY: adminSecretKey,
} = import.meta.env;

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

const wsLink = new GraphQLWsLink(
  createClient({
    url: VITE_WS_GRAPHQL_URL,
    connectionParams: {
      headers: {
        'x-hasura-admin-secret': adminSecretKey,
      },
    },
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

export const apollo = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
