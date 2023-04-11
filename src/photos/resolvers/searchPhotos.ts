import { PrismaClient } from '@prisma/client';
import { Arg, Ctx, Int, Query, Resolver } from 'type-graphql';
import Photo from '../photo';

@Resolver(Photo)
export default class SearchPhotosResolver {
  @Query(() => [Photo], { nullable: true })
  async searchPhotos(
    @Arg('keyword') keyword: string,
    @Arg('page', () => Int) page: number,
    @Ctx('client') client: PrismaClient
  ) {
    try {
      const SIZE = 5;
      return client.photo.findMany({
        where: {
          caption: {
            startsWith: keyword,
          },
        },
        take: SIZE,
        skip: (page - 1) * SIZE,
      });
    } catch (err) {
      return {
        ok: false,
        error: "Can't search photos",
      };
    }
  }
}
