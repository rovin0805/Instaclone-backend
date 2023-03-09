import client from '@/client';
import { Arg, Args, Mutation, Resolver } from 'type-graphql';
import * as bcrypt from 'bcrypt';
import CreateAccountArgs from '@/constants/types/users/createAccountArgs';
import User from '../user';
import * as jwt from 'jsonwebtoken';
import LoginResult from '@/constants/types/users/loginResult';

@Resolver(User)
export default class UserMutationResolver {
  @Mutation(() => User)
  async createAccount(
    @Args() args: CreateAccountArgs
  ): Promise<User | unknown> {
    // TODO: error return type
    try {
      const { firstName, lastName, username, email, password } = args;

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
  }

  @Mutation(() => LoginResult)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string
  ): Promise<LoginResult> {
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
  }
}
