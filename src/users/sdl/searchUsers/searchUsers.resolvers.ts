import client from '@/client';

export default {
  Query: {
    searchUsers: async (_, { keyword, page }) => {
      try {
        if (!keyword) {
          return [];
        }
        const SIZE = 5;
        return client.user.findMany({
          where: {
            username: {
              startsWith: keyword.toLowerCase(),
            },
          },
          take: SIZE,
          skip: (page - 1) * SIZE,
        });
      } catch (err) {
        return {
          ok: false,
          error: "Can't find users",
        };
      }
    },
  },
};
