import CommonResult from '@/types/common/result';
import Comments from '../comments';
import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { protectedResolver } from '@/utils/protectResolver';
import ContextType from '@/types/common/contextType';

@Resolver(Comments)
export default class DeleteCommentResolver {
  @Mutation(() => CommonResult)
  @UseMiddleware(protectedResolver)
  async deleteComment(
    @Arg('id', () => Int) id: number,
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
        await client.comment.delete({ where: { id } });
        return { ok: true };
      }
    } catch (err) {
      return {
        ok: false,
        error: "Can't delete the comment",
      };
    }
  }
}
