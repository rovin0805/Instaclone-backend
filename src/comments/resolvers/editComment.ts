import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import Comments from '../comments';
import CommonResult from '@/types/common/result';
import { protectedResolver } from '@/utils/protectResolver';
import ContextType from '@/types/common/contextType';

@Resolver(Comments)
export default class EditCommentResolver {
  @Mutation(() => CommonResult)
  @UseMiddleware(protectedResolver)
  async editComment(
    @Arg('id', () => Int) id: number,
    @Arg('payload') payload: string,
    @Ctx() context: ContextType
  ) {
    try {
      const { client, loggedInUser } = context;
      const comment = await client.comment.findUnique({
        where: { id },
        select: { userId: true },
      });

      if (!comment) {
        return {
          ok: false,
          error: 'Comment not found',
        };
      } else if (comment.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: 'Not authorized',
        };
      } else {
        await client.comment.update({
          where: { id },
          data: { payload },
        });
        return { ok: true };
      }
    } catch (err) {
      return {
        ok: false,
        error: "Can't edit the comment",
      };
    }
  }
}
