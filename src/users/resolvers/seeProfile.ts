import { PrismaClient } from '@prisma/client';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import User from '../user';

@Resolver(User)
export default class SeeProfileResolver {
  @Query(() => User, { nullable: true })
  async seeProfile(
    @Arg('username') username: string,
    @Ctx('client') client: PrismaClient
  ) {
    try {
      return client.user.findUnique({
        where: {
          username,
        },
        include: {
          followers: true,
          following: true,
        },
      });
    } catch (err) {
      return {
        ok: false,
        error: "Can't see the profile",
      };
    }
  }
}
