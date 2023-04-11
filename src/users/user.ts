import { IsBoolean, IsDate, IsEmail, IsInt } from 'class-validator';
import { Arg, Ctx, Field, ID, Int, ObjectType, Root } from 'type-graphql';
import client from '@/client';
import Photo from '@/photos/photo';
import { PrismaClient } from '@prisma/client';

@ObjectType()
export default class User {
  @Field(() => ID)
  @IsInt()
  id: number;

  @Field()
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName?: string | null;

  @Field()
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  bio?: string | null;

  @Field(() => String, { nullable: true })
  avatar?: string | null;

  @Field()
  @IsDate()
  createdAt: Date;

  @Field()
  @IsDate()
  updatedAt: Date;

  @Field(() => [User])
  following: User[];

  @Field(() => [User])
  followers: User[];

  @Field(() => Int)
  @IsInt()
  totalFollowing(@Root() root: User) {
    return client.user.count({
      where: {
        followers: {
          some: { id: root.id },
        },
      },
    });
  }

  @Field(() => Int)
  @IsInt()
  totalFollowers(@Root() root: User) {
    return client.user.count({
      where: {
        following: {
          some: { id: root.id },
        },
      },
    });
  }

  @Field(() => Boolean)
  @IsBoolean()
  isMe(@Root() root: User, @Ctx('loggedInUser') loggedInUser: User) {
    return !!loggedInUser && root.id === loggedInUser.id;
  }

  @Field(() => Boolean)
  @IsBoolean()
  async isFollowing(
    @Root() root: User,
    @Ctx('loggedInUser') loggedInUser: User
  ) {
    if (!loggedInUser) {
      return false;
    }
    const exists = await client.user.count({
      where: {
        username: loggedInUser.username,
        following: {
          some: {
            id: root.id,
          },
        },
      },
    });
    return !!exists;
  }

  @Field(() => [Photo])
  photos(
    @Root() root: User,
    @Arg('page', () => Int) page: number,
    @Ctx('client') client: PrismaClient
  ) {
    const SIZE = 5;
    return client.user.findUnique({ where: { id: root.id } }).photos({
      take: SIZE,
      skip: (page - 1) * SIZE,
    });
  }
}
