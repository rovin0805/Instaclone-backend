import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class CommonResult {
  @Field(() => Boolean)
  ok: boolean;

  @Field(() => String, { nullable: true })
  error?: string;
}
