import { PrismaClient } from '@prisma/client';
import Hashtag from '@/types/hashtag';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import Photo from '../photo';

@Resolver(Photo)
export default class SeeHashtagResolver {
  @Query(() => Hashtag, { nullable: true })
  seeHashtag(
    @Arg('hashtag') hashtag: string,
    @Ctx('client') client: PrismaClient
  ) {
    try {
      return client.hashtag.findUnique({
        where: {
          hashtag: hashtag.startsWith('#') ? hashtag : `#${hashtag}`,
        },
      });
    } catch (err) {
      return {
        ok: false,
        error: "Can't fetch the hashtag",
      };
    }
  }
}
