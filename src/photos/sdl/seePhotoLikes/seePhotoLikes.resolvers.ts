import client from '@/client';

export default {
  Query: {
    seePhotoLikes: async (_, { id }) => {
      try {
        const likes = await client.like.findMany({
          where: { photoId: id },
          select: { user: true },
        });
        return likes.map((like) => like.user);
      } catch (err) {
        return {
          ok: false,
          error: "Can't see the photo likes",
        };
      }
    },
  },
};
