import client from '@/client';

export default {
  Query: {
    seePhoto: (_, { id }) => {
      try {
        return client.photo.findUnique({
          where: { id },
        });
      } catch (err) {
        return {
          ok: false,
          error: "Can't see the photo",
        };
      }
    },
  },
};
