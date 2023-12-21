import { loadEnv } from 'vite';

const { VITE_GRAPHQL_URL: schemaUrl, VITE_GRAPHQL_ADMIN_SECRET_KEY: secret } =
  loadEnv('GQL_GENERATE_CLIENTS', process.cwd());

export default {
  schema: [
    {
      [schemaUrl]: {
        headers: {
          'x-hasura-admin-secret': secret,
        },
      },
    },
  ],
  documents: ['./src/**/*.tsx', './src/**/*.ts'],
  overwrite: true,
  generates: {
    './src/graphql.types.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};
