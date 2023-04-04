import client from '@/client';

export default {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
      try {
        const ok = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });
        if (!ok) {
          return {
            ok: false,
            error: "Can't find the user",
          };
        }

        const SIZE = 5;
        const following = await client.user
          .findUnique({ where: { username } })
          .following({
            take: SIZE,
            skip: lastId ? 1 : 0,
            ...(lastId && { cursor: { id: lastId } }),
          });
        const totalFollowing = await client.user.count({
          where: { followers: { some: { username } } },
        });

        return {
          ok: true,
          following,
          totalPages: totalFollowing,
        };
      } catch (err) {
        return {
          ok: false,
          error: "Can't fetch following list",
        };
      }
    },
  },
};
