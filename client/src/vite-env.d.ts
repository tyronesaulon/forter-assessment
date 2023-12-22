/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_URL: string;
  readonly VITE_GRAPHQL_ADMIN_SECRET_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
