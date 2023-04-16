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
import User from '@/users/user';
import { PrismaClient } from '@prisma/client';
import CommonResult from '@/types/common/result';

@ObjectType()
class SeePhotoLikesResult extends CommonResult {
  @Field(() => [User], { nullable: true })
  users?: User[];
}

@Resolver(Photo)
export default class SeePhotoLikesResolver {
  @Query(() => SeePhotoLikesResult)
  async seePhotoLikes(
    @Arg('id', () => Int) id: number,
    @Ctx('client') client: PrismaClient
  ) {
    try {
      const likes = await client.like.findMany({
        where: { photoId: id },
        select: { user: true },
      });
      const users = likes.map((like) => like.user);
      return {
        ok: true,
        users,
      };
    } catch (err) {
      return {
        ok: false,
        error: "Can't see the photo likes",
      };
    }
  }
}
