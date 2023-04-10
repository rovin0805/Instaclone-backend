import { PrismaClient } from '@prisma/client';
import { Arg, Ctx, Int, Query, Resolver } from 'type-graphql';
import Photo from '../photo';

@Resolver(Photo)
export default class SeePhoto {
  @Query(() => Photo)
  seePhoto(
    @Arg('id', () => Int) id: number,
    @Ctx('client') client: PrismaClient
  ) {
    return client.photo.findUnique({
      where: { id },
    });
  }
}
