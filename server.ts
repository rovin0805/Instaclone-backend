import 'dotenv/config';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import getSchema from './schema';
import { getUser } from './utils/getUser';
import express from 'express';
import { graphqlUploadExpress } from 'graphql-upload';
import logger from 'morgan';

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
  app.use(logger('dev'));
  app.use('/static', express.static('uploads'));

  apolloServer.applyMiddleware({ app });

  await new Promise<void>((func) =>
    app.listen({ port: process.env.PORT }, func)
  );

  console.log(`✅ Server is listening : http://localhost:${process.env.PORT}`);
};

startServer();
