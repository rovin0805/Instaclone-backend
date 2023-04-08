import { PrismaClient } from '@prisma/client';
import { Arg, Ctx, Int, Query, Resolver } from 'type-graphql';
import User from '../user';

@Resolver(User)
export default class SearchUsersResolver {
  @Query(() => [User])
  async searchUsers(
    @Arg('keyword') keyword: string,
    @Arg('page', () => Int) page: number,
    @Ctx('client') client: PrismaClient
  ) {
    try {
      if (!keyword) {
        return [];
      }
      const SIZE = 5;
      return client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
        take: SIZE,
        skip: (page - 1) * SIZE,
      });
    } catch (err) {
      return {
        ok: false,
        error: "Can't find users",
      };
    }
  }
}
