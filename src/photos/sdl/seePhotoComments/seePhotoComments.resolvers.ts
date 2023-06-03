import client from '@/client';

export default {
  Query: {
    seePhotoComments: async (_, { id, page }) => {
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
    },
  },
};
