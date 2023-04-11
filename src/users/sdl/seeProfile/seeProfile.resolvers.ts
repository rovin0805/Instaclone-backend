import client from '@/client';

export default {
  Query: {
    seeProfile: (_: any, { username }: any) => {
      try {
        return client.user.findUnique({
          where: {
            username,
          },
          include: {
            followers: true,
            following: true,
          },
        });
      } catch (err) {
        return {
          ok: false,
          error: "Can't see the profile",
        };
      }
    },
  },
};
