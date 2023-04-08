import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import * as bcrypt from 'bcrypt';
import User from '../user';
import * as jwt from 'jsonwebtoken';
import LoginResult from '@/types/users/loginResult';
import { PrismaClient } from '@prisma/client';

@Resolver(User)
export default class LoginResolver {
  @Mutation(() => LoginResult)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Ctx('client') client: PrismaClient
  ) {
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
