import { IsDate, IsEmail, IsInt } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';

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

  @Field()
  @IsDate()
  createdAt: Date;

  @Field()
  @IsDate()
  updatedAt: Date;
}