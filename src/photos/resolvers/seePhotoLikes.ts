import { Arg, Ctx, Int, Query, Resolver } from 'type-graphql';
import Photo from '../photo';
import User from '@/users/user';
import { PrismaClient } from '@prisma/client';

@Resolver(Photo)
export default class SeePhotoLikesResolver {
  @Query(() => [User])
  async seePhotoLikes(
    @Arg('id', () => Int) id: number,
    @Ctx('client') client: PrismaClient
  ) {
    try {
      const likes = await client.like.findMany({
        where: { photoId: id },
        select: { user: true },
      });
      return likes.map((like) => like.user);
    } catch (err) {
      return {
        ok: false,
        error: "Can't see the photo likes",
      };
    }
  }
}
