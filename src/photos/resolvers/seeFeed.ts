import {
  Arg,
  Ctx,
  Field,
  Int,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import Photo from '../photo';
import CommonResult from '@/types/common/result';
import ContextType from '@/types/common/contextType';
import { protectedResolver } from '@/utils/protectResolver';

@ObjectType()
class SeeFeedResult extends CommonResult {
  @Field(() => [Photo], { nullable: true })
  feed?: Photo[];
}

@Resolver(Photo)
export default class SeeFeedResolver {
  @Query(() => SeeFeedResult)
  @UseMiddleware(protectedResolver)
  async seeFeed(
    @Arg('page', () => Int) page: number,
    @Ctx() context: ContextType
  ) {
    try {
      const { client, loggedInUser } = context;
      const SIZE = 5;
      const feed = await client.photo.findMany({
        where: {
          OR: [
            {
              user: {
                id: loggedInUser.id,
              },
            },
            {
              user: {
                followers: {
                  some: {
                    id: loggedInUser.id,
                  },
                },
              },
            },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: SIZE,
        skip: (page - 1) * SIZE,
      });

      return {
        ok: true,
        feed,
      };
    } catch (err) {
      return {
        ok: false,
        error: "Can't see feed",
      };
    }
  }
}
