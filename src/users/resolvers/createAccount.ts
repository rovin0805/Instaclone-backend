import { Args, Ctx, Mutation, Resolver } from 'type-graphql';
import * as bcrypt from 'bcrypt';
import User from '../user';
import CreateAccountArgs from '@/types/users/createAccountArgs';
import CommonResult from '@/types/common/result';
import { PrismaClient } from '@prisma/client';

@Resolver(User)
export default class CreateAccountResolver {
  @Mutation(() => CommonResult)
  async createAccount(
    @Args() args: CreateAccountArgs,
    @Ctx('client') client: PrismaClient
  ) {
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
      return {
        ok: false,
        error: "Can't create an account",
      };
    }
  }
}
