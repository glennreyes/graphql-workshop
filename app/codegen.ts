import type { CodegenConfig } from '@graphql-codegen/cli';
import { graphqlEndpoint } from './lib/constants';

const config: CodegenConfig = {
  config: {
    scalars: {
      DateTime: 'string',
    },
    strictScalars: true,
  },
  documents: 'graphql/**/*.graphql',
  generates: {
    'graphql/generated/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
  overwrite: true,
  schema: graphqlEndpoint,
};
export default config;
