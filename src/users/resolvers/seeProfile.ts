import { PrismaClient } from '@prisma/client';
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from 'type-graphql';
import User from '../user';
import CommonResult from '@/types/common/result';

@ObjectType()
class SeeProfileResult extends CommonResult {
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export default class SeeProfileResolver {
  @Query(() => SeeProfileResult)
  async seeProfile(
    @Arg('username') username: string,
    @Ctx('client') client: PrismaClient
  ) {
    try {
      const user = await client.user.findUnique({
        where: {
          username,
        },
        include: {
          followers: true,
          following: true,
        },
      });
      return {
        ok: true,
        user,
      };
    } catch (err) {
      return {
        ok: false,
        error: "Can't see the user's profile",
      };
    }
  }
}
