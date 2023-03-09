import { Field, ObjectType } from 'type-graphql';
import CommonResult from '../common/result';

@ObjectType()
export default class LoginResult extends CommonResult {
  @Field(() => String, { nullable: true })
  token?: string;
}
