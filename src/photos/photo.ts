import Hashtag from '@/types/hashtag';
import User from '@/users/user';
import { IsBoolean, IsInt } from 'class-validator';
import { Ctx, Field, ID, Int, ObjectType, Root } from 'type-graphql';
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

  @Field(() => [Hashtag])
  hashtags(@Root() root: PrismaPhoto, @Ctx('client') client: PrismaClient) {
    return client.hashtag.findMany({
      where: {
        photos: {
          some: { id: root.id },
        },
      },
    });
  }

  @Field(() => Int)
  likesCount(@Root() root: PrismaPhoto, @Ctx('client') client: PrismaClient) {
    return client.like.count({ where: { photoId: root.id } });
  }

  @Field(() => Int)
  commentsCount(
    @Root() root: PrismaPhoto,
    @Ctx('client') client: PrismaClient
  ) {
    return client.comment.count({ where: { photoId: root.id } });
  }

  @Field(() => Boolean)
  @IsBoolean()
  isMe(@Root() root: PrismaPhoto, @Ctx('loggedInUser') loggedInUser: User) {
    return !!loggedInUser && root.userId === loggedInUser.id;
  }
}
