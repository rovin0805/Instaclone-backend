import client from '@/client';

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
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
        const followers = await client.user
          .findUnique({ where: { username } })
          .followers({
            take: SIZE,
            skip: (page - 1) * SIZE,
          });
        const totalFollowers = await client.user.count({
          where: { following: { some: { username } } },
        });

        return {
          ok: true,
          followers,
          totalPages: Math.ceil(totalFollowers / SIZE),
        };
      } catch (err) {
        return {
          ok: false,
          error: "Can't fetch followers list",
        };
      }
    },
  },
};
