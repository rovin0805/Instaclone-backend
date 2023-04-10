import Hashtags from '@/types/hashtags';
import User from '@/users/user';
import { IsInt } from 'class-validator';
import { Ctx, Field, ID, ObjectType, Root } from 'type-graphql';
import { Photo as PrismaPhoto, PrismaClient } from '@prisma/client';

@ObjectType()
export default class Photo {
  @Field(() => ID)
  @IsInt()
  id: number;

  @Field()
  file: string;

  @Field(() => String, { nullable: true })
  caption?: string | null;

  @Field(() => User)
  user(@Root() root: PrismaPhoto, @Ctx('client') client: PrismaClient) {
    return client.user.findUnique({ where: { id: root.userId } });
  }

  @Field(() => [Hashtags])
  hashtags(@Root() root: PrismaPhoto, @Ctx('client') client: PrismaClient) {
    return client.hashtag.findMany({
      where: {
        photos: {
          some: { id: root.id },
        },
      },
    });
  }
}