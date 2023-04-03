import { IsDate, IsEmail, IsInt } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { User as PrismaUser } from '@prisma/client';

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
  following: PrismaUser[];

  @Field(() => [User])
  followers: PrismaUser[];
}
