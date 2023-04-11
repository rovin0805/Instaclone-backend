import { extractHashtags } from '@/utils/extractHashtags';
import client from '@/client';
import { protectedResolver2 } from '@/utils/protectResolver';

const resolverFn = async (_, { id, caption }, { loggedInUser }) => {
  try {
    const oldPhoto = await client.photo.findFirst({
      where: {
        id,
        userId: loggedInUser.id,
      },
      include: {
        hashtags: {
          select: {
            hashtag: true,
          },
        },
      },
    });

    if (!oldPhoto) {
      return {
        ok: false,
        error: 'The photo not found',
      };
    }

    await client.photo.update({
      where: {
        id,
      },
      data: {
        caption,
        hashtags: {
          disconnect: oldPhoto.hashtags,
          connectOrCreate: extractHashtags(caption),
        },
      },
    });

    return {
      ok: true,
    };
  } catch (err) {
    return {
      ok: false,
      error: "Can't edit the photo",
    };
  }
};

export default {
  Mutation: {
    editPhoto: protectedResolver2(resolverFn),
  },
};
