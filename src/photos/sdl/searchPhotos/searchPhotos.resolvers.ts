import client from '@/client';

export default {
  Query: {
    searchPhotos: (_, { keyword, page }) => {
      try {
        const SIZE = 5;
        return client.photo.findMany({
          where: {
            caption: {
              startsWith: keyword,
            },
          },
          take: SIZE,
          skip: (page - 1) * SIZE,
        });
      } catch (err) {
        return {
          ok: false,
          error: "Can't search photos",
        };
      }
    },
  },
};
