import client from '@/client';

export default {
  User: {
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: { id },
          },
        },
      }),

    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: { id },
          },
        },
      }),

    isMe: ({ id }, _, { loggedInUser }) =>
      !!loggedInUser && id === loggedInUser.id,

    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return !!exists;
    },

    photos: ({ id }, { page }) => {
      const SIZE = 5;
      return client.user.findUnique({ where: { id } }).photos({
        take: SIZE,
        skip: (page - 1) * SIZE,
      });
    },
  },
};
