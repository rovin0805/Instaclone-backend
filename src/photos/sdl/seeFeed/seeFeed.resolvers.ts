import client from '@/client';
import { protectedResolver2 } from '@/utils/protectResolver';

const resolverFn = (_, { page }, { loggedInUser }) => {
  const SIZE = 5;
  return client.photo.findMany({
    where: {
      OR: [
        {
          user: {
            followers: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        },
        {
          user: {
            id: loggedInUser.id,
          },
        },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: SIZE,
    skip: (page - 1) * SIZE,
  });
};

export default {
  Query: {
    seeFeed: protectedResolver2(resolverFn),
  },
};
