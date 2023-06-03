import CommonResult from '@/types/common/result';
import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import Comments from '../comments';
import { protectedResolver } from '@/utils/protectResolver';
import ContextType from '@/types/common/contextType';

@Resolver(Comments)
export default class CreateCommentResolver {
  @Mutation(() => CommonResult)
  @UseMiddleware(protectedResolver)
  async createComment(
    @Arg('photoId', () => Int) photoId: number,
    @Arg('payload') payload: string,
    @Ctx() context: ContextType
  ) {
    try {
      const { client, loggedInUser } = context;

      const ok = await client.photo.findUnique({
        where: { id: photoId },
        select: { id: true },
      });

      if (!ok) {
        return {
          ok: false,
          error: "Can't find the photo",
        };
      }

      await client.comment.create({
        data: {
          payload,
          photo: {
            connect: {
              id: photoId,
            },
          },
          user: {
            connect: {
              id: loggedInUser.id,
            },
          },
        },
      });

      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        error: "Can't create a comment",
      };
    }
  }
}
