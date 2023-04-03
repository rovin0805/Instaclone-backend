import client from '@/client';

export default {
  Query: {
    seeProfile: (_: any, { username }: any) =>
      client.user.findUnique({
        where: {
          username,
        },
        include: {
          followers: true,
          following: true,
        },
      }),
  },
};
