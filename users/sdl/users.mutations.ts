import * as bcrypt from 'bcrypt';
import client from '@/client';
import * as jwt from 'jsonwebtoken';

const UserMutation = {
  Mutation: {
    createAccount: async (
      _: any,
      { firstName, lastName, username, email, password }: any
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });

        if (existingUser) {
          throw new Error('This username/email is already taken.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: hashedPassword,
          },
        });
      } catch (error) {
        return error;
      }
    },

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

export default UserMutation;
