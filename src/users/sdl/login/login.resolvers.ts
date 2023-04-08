import client from '@/client';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export default {
  Mutation: {
    login: async (_: any, { username, password }: any) => {
      const user = await client.user.findUnique({
        where: { username },
      });

      if (!user) {
        return {
          ok: false,
          error: 'User Not Found',
        };
      }

      const isCorrectPassword = await bcrypt.compare(password, user.password);

      if (!isCorrectPassword) {
        return {
          ok: false,
          error: 'Incorrect Password',
        };
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string);

      return {
        ok: true,
        token,
      };
    },
  },
};
