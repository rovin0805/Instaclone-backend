import { PrismaClient } from '@prisma/client';
import Hashtag from '@/types/hashtag';
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from 'type-graphql';
import Photo from '../photo';
import CommonResult from '@/types/common/result';

@ObjectType()
class SeeHashtagResult extends CommonResult {
  @Field(() => Hashtag, { nullable: true })
  hashtag?: Hashtag;
}

@Resolver(Photo)
export default class SeeHashtagResolver {
  @Query(() => SeeHashtagResult)
  async seeHashtag(
    @Arg('hashtag') hashtag: string,
    @Ctx('client') client: PrismaClient
  ) {
    try {
      const searchedHashtag = client.hashtag.findUnique({
        where: {
          hashtag: hashtag.startsWith('#') ? hashtag : `#${hashtag}`,
        },
      });
      return {
        ok: true,
        hashtag: searchedHashtag,
      };
    } catch (err) {
      return {
        ok: false,
        error: "Can't search the hashtag",
      };
    }
  }
}
