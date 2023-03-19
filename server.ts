import 'dotenv/config';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import getSchema from './schema';
import { getUser } from './utils/getUser';

// const server = new ApolloServer({
//   schema,
// });

// server
//   .listen()
//   .then(() =>
//     console.log(`✅ Server is listening : http://localhost:${process.env.PORT}`)
//   );

const server = async () => {
  const schema = await getSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req }) => ({
      loggedInUser: await getUser(req.headers.authorization),
    }),
  });

  await apolloServer.listen();
  console.log(`✅ Server is listening : http://localhost:${process.env.PORT}`);
};

server();
