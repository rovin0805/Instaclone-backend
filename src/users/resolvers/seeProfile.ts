import { PrismaClient } from '@prisma/client';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import User from '../user';

@Resolver(User)
export default class SeeProfileResolver {
  @Query(() => User)
  async seeProfile(
    @Arg('username') username: string,
    @Ctx('client') client: PrismaClient
  ) {
    return client.user.findUnique({
      where: {
        username,
      },
      include: {
        followers: true,
        following: true,
      },
    });
  }
}
