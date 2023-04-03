import client from '@/client';
import CommonResult from '@/types/common/result';
import { protectedResolver } from '@/utils/protectResolver';
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import User from '../user';

@Resolver(User)
export default class FollowUserResolver {
  @Mutation(() => CommonResult)
  @UseMiddleware(protectedResolver)
  async followUser(
    @Arg('username') username: string,
    @Ctx('loggedInUser') loggedInUser: User
  ): Promise<CommonResult> {
    try {
      const ok = await client.user.findUnique({ where: { username } });
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
            connect: {
              username,
            },
          },
        },
      });

      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        error: "Can't follow the user",
      };
    }
  }
}
