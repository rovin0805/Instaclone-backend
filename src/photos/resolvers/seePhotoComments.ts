import Comments from '@/comments/comments';
import CommonResult from '@/types/common/result';
import { PrismaClient } from '@prisma/client';
import {
  Arg,
  Ctx,
  Field,
  Int,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';

@ObjectType()
class SeePhotoCommentsResult extends CommonResult {
  @Field(() => [Comments], { nullable: true })
  comments?: Comments[];
}

@Resolver(Comments)
export default class SeePhotoComments {
  @Query(() => SeePhotoCommentsResult)
  async seePhotoComments(
    @Arg('id', () => Int) id: number,
    @Arg('page', () => Int) page: number,
    @Ctx('client') client: PrismaClient
  ) {
    try {
      const SIZE = 5;
      const comments = await client.photo
        .findUnique({ where: { id } })
        .comments({ take: SIZE, skip: (page - 1) * SIZE });
      return {
        comments,
        ok: true,
      };
    } catch (err) {
      return {
        ok: false,
        error: "Can't find the photo comments",
      };
    }
  }
}
