import 'dotenv/config';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import getSchema from './schema';
import { getUser } from './utils/getUser';
import express from 'express';
import { graphqlUploadExpress } from 'graphql-upload';

// const server = new ApolloServer({
//   schema,
// });

// server
//   .listen()
//   .then(() =>
//     console.log(`✅ Server is listening : http://localhost:${process.env.PORT}`)
//   );

const startServer = async () => {
  const schema = await getSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req }) => ({
      loggedInUser: await getUser(req.headers.authorization),
    }),
    // csrfPrevention: true,
    // cache: 'bounded',
    // plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  await apolloServer.start();

  const app = express();
  app.use(graphqlUploadExpress());
  apolloServer.applyMiddleware({ app });

  await new Promise<void>((func) => app.listen({ port: 4000 }, func));

  console.log(`✅ Server is listening : http://localhost:${process.env.PORT}`);
};

startServer();
