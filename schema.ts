import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';

const loadedTypeDefs = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadedResolvers = loadFilesSync(
  `${__dirname}/**/*.{queries,mutations}.ts`
);

const typeDefs = mergeTypeDefs(loadedTypeDefs);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
