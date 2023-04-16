import { Field, Int, ObjectType } from 'type-graphql';
import CommonResult from '../common/result';
import User from '@/users/user';
import { User as PrismaUser } from '@prisma/client';

@ObjectType()
export class SeeFollowersResult extends CommonResult {
  @Field(() => [User], { nullable: true })
  followers?: PrismaUser[];

  @Field(() => Int, { nullable: true })
  totalPages?: number;
}

@ObjectType()
export class SeeFollowingResult extends CommonResult {
  @Field(() => [User], { nullable: true })
  following?: PrismaUser[];

  @Field(() => Int, { nullable: true })
  totalPages?: number;
}
