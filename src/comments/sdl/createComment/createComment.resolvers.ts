import client from '@/client';
import { protectedResolver2 } from '@/utils/protectResolver';

const resolverFn = async (_, { photoId, payload }, { loggedInUser }) => {
  try {
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
};

export default {
  Mutation: {
    createComment: protectedResolver2(resolverFn),
  },
};
