import client from '@/client';
import CommonResult from '@/types/common/result';
import { protectedResolver } from '@/utils/protectResolver';
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import User from '../user';

@Resolver(User)
export default class UnfollowUserResolver {
  @Mutation(() => CommonResult)
  @UseMiddleware(protectedResolver)
  async unfollowUser(
    @Arg('username') username: string,
    @Ctx('loggedInUser') loggedInUser: User
  ) {
    try {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: 'The use does not exist',
        };
      }

      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          following: {
            disconnect: {
              username,
            },
          },
        },
      });

      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        error: "Can't unfollow the user",
      };
    }
  }
}
