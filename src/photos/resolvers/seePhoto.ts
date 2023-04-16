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
class SeePhotoResult extends CommonResult {
  @Field(() => Photo, { nullable: true })
  photo?: Photo;
}

@Resolver(Photo)
export default class SeePhoto {
  @Query(() => SeePhotoResult)
  async seePhoto(
    @Arg('id', () => Int) id: number,
    @Ctx('client') client: PrismaClient
  ) {
    try {
      const photo = await client.photo.findUnique({
        where: { id },
      });
      return {
        ok: true,
        photo,
      };
    } catch (err) {
      return {
        ok: false,
        error: "Can't see the photo",
      };
    }
  }
}
