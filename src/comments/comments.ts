import Photo from '@/photos/photo';
import User from '@/users/user';
import { PrismaClient, Comment as PrismaComment } from '@prisma/client';
import { IsBoolean, IsInt } from 'class-validator';
import { Ctx, Field, ID, ObjectType, Root } from 'type-graphql';

@ObjectType()
export default class Comments {
  @Field(() => ID)
  @IsInt()
  id: number;

  @Field(() => User)
  user(@Root() root: PrismaComment, @Ctx('client') client: PrismaClient) {
    return client.user.findUnique({
      where: { id: root.userId },
    });
  }

  @Field(() => Photo)
  photo(@Root() root: PrismaComment, @Ctx('client') client: PrismaClient) {
    return client.photo.findUnique({
      where: { id: root.photoId },
    });
  }

  @Field()
  payload: string;

  @Field(() => Boolean)
  @IsBoolean()
  isMe(@Root() root: PrismaComment, @Ctx('loggedInUser') loggedInUser: User) {
    return !!loggedInUser && root.userId === loggedInUser.id;
  }
}
