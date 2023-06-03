import client from '@/client';
import { protectedResolver2 } from '@/utils/protectResolver';

const resolverFn = async (_, { id }, { loggedInUser }) => {
  try {
    const ok = await client.photo.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!ok) {
      return {
        ok: false,
        error: 'The photo not found',
      };
    }

    const likes = await client.like.findUnique({
      where: {
        photoId_userId: {
          userId: loggedInUser.id,
          photoId: id,
        },
      },
    });

    if (likes) {
      await client.like.delete({
        where: { id: likes.id },
      });
    } else {
      await client.like.create({
        data: {
          user: {
            connect: {
              id: loggedInUser.id,
            },
          },
          photo: {
            connect: { id },
          },
        },
      });
    }

    return {
      ok: true,
    };
  } catch (err) {
    return {
      ok: false,
      error: "Can't toggle the like",
    };
  }
};

export default {
  Mutation: {
    togglePhoto: protectedResolver2(resolverFn),
  },
};
