import client from '@/client';
import { SeeFollowingResult } from '@/types/users/seeFollowResult';
import { Arg, Int, Query, Resolver } from 'type-graphql';
import User from '../user';

@Resolver(User)
export default class SeeFollowingResolver {
  @Query(() => SeeFollowingResult)
  async seeFollowing(
    @Arg('username') username: string,
    @Arg('lastId', () => Int, { nullable: true }) lastId?: number
  ) {
    try {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "Can't find the user",
        };
      }

      const SIZE = 5;
      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take: SIZE,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
      const totalFollowing = await client.user.count({
        where: { followers: { some: { username } } },
      });

      return {
        ok: true,
        following,
        totalPages: totalFollowing,
      };
    } catch (err) {
      return {
        ok: false,
        error: "Can't fetch following list",
      };
    }
  }
}
