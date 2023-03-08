import { IsEmail } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class CreateAccountArgs {
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
  password: string;
}
