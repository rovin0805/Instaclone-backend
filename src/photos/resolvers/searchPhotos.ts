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
import Photo from '../photo';
import CommonResult from '@/types/common/result';

@ObjectType()
class SearchPhotosResult extends CommonResult {
  @Field(() => [Photo], { nullable: true })
  photos?: Photo[];
}

@Resolver(Photo)
export default class SearchPhotosResolver {
  @Query(() => SearchPhotosResult)
  async searchPhotos(
    @Arg('keyword') keyword: string,
    @Arg('page', () => Int) page: number,
    @Ctx('client') client: PrismaClient
  ) {
    try {
      if (!keyword) {
        return {
          ok: true,
          photos: [],
        };
      }
      const SIZE = 5;
      const photos = await client.photo.findMany({
        where: {
          caption: {
            startsWith: keyword,
          },
        },
        take: SIZE,
        skip: (page - 1) * SIZE,
      });

      return {
        ok: true,
        photos,
      };
    } catch (err) {
      return {
        ok: false,
        error: "Can't search photos",
      };
    }
  }
}
