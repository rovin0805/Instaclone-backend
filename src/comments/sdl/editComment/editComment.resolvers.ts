import client from '@/client';
import { protectedResolver2 } from '@/utils/protectResolver';

const resolverFn = async (_, { id, payload }, { loggedInUser }) => {
  try {
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
};

export default {
  Mutation: {
    editComment: protectedResolver2(resolverFn),
  },
};
