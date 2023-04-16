import { PrismaClient } from '@prisma/client';
import {
  Arg,
  Ctx,
  Field,
  Int,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import User from '../user';
import CommonResult from '@/types/common/result';

@ObjectType()
class SearchUsersResult extends CommonResult {
  @Field(() => [User], { nullable: true })
  users?: User[];
}

@Resolver(User)
export default class SearchUsersResolver {
  @Query(() => SearchUsersResult)
  async searchUsers(
    @Arg('keyword') keyword: string,
    @Arg('page', () => Int) page: number,
    @Ctx('client') client: PrismaClient
  ) {
    try {
      if (!keyword) {
        return {
          ok: true,
          users: [],
        };
      }
      const SIZE = 5;
      const users = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
        take: SIZE,
        skip: (page - 1) * SIZE,
      });
      return {
        ok: true,
        users,
      };
    } catch (err) {
      return {
        ok: false,
        error: "Can't search the users",
      };
    }
  }
}
