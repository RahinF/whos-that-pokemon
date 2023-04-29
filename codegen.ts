import { CodegenConfig } from '@graphql-codegen/cli';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

const endpoint = process.env.NEXT_PUBLIC_API_URL!;

const config: CodegenConfig = {
<<<<<<< HEAD
  schema: endpoint,
=======
  schema: process.env.NEXT_PUBLIC_API_URL!,
>>>>>>> e1941c92d8284f2cbfa6d413d001153fc52a8968
  ignoreNoDocuments: true,
  generates: {
    './src/gql/': {
      documents: ['src/**/*.tsx'],
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
