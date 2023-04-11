import { PrismaClient } from '@prisma/client';
import { Arg, Ctx, Int, Query, Resolver } from 'type-graphql';
import Photo from '../photo';

@Resolver(Photo)
export default class SeePhoto {
  @Query(() => Photo, { nullable: true })
  seePhoto(
    @Arg('id', () => Int) id: number,
    @Ctx('client') client: PrismaClient
  ) {
    try {
      return client.photo.findUnique({
        where: { id },
      });
    } catch (err) {
      return {
        ok: false,
        error: "Can't see the photo",
      };
    }
  }
}
