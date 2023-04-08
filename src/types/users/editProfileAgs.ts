import { IsEmail } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class EditProfileArgs {
  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  email?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => GraphQLUpload, { nullable: true })
  avatar?: Promise<FileUpload>;
}
