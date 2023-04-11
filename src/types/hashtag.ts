import Photo from '@/photos/photo';
import { IsInt } from 'class-validator';
import { Arg, Ctx, Field, ID, Int, ObjectType, Root } from 'type-graphql';
import { Hashtag as PrismaHashtag, PrismaClient } from '@prisma/client';

@ObjectType()
export default class Hashtag {
  @Field(() => ID)
  @IsInt()
  id: number;

  @Field()
  hashtag: string;

  @Field(() => [Photo])
  photos(
    @Root() root: PrismaHashtag,
    @Arg('page', () => Int) page: number,
    @Ctx('client') client: PrismaClient
  ) {
    const SIZE = 5;
    return client.hashtag.findUnique({ where: { id: root.id } }).photos({
      take: SIZE,
      skip: (page - 1) * SIZE,
    });
  }

  @Field(() => Int)
  totalPhotos(
    @Root() root: PrismaHashtag,
    @Ctx('client') client: PrismaClient
  ) {
    return client.photo.count({
      where: {
        hashtags: {
          some: {
            id: root.id,
          },
        },
      },
    });
  }
}
