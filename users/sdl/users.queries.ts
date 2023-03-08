import client from '@/client';

const UserQuery = {
  Query: {
    seeProfile: (_: any, { username }: any) =>
      client.user.findUnique({
        where: {
          username,
        },
      }),
  },
};

export default UserQuery;
