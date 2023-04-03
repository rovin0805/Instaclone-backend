import client from '@/client';
import * as bcrypt from 'bcrypt';

export default {
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

        await client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: hashedPassword,
          },
        });

        return {
          ok: true,
        };
      } catch (error) {
        return error;
      }
    },
  },
};
