import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { buildSchema } from 'type-graphql';

// const loadedTypeDefs = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
// const loadedResolvers = loadFilesSync(
//   `${__dirname}/**/*.{queries,mutations}.ts`
// );

// const typeDefs = mergeTypeDefs(loadedTypeDefs);
// const resolvers = mergeResolvers(loadedResolvers);

const getSchema = async () => {
  const schema = await buildSchema({
    resolvers: [`${__dirname}/**/*.resolvers.ts`],
  });
  return schema;
};

// const schema = makeExecutableSchema({ typeDefs, resolvers });

export default getSchema;
