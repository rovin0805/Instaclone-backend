import client from '@/client';
import { protectedResolver2 } from '@/utils/protectResolver';

const resolverFn = async (_: any, { username }: any, { loggedInUser }: any) => {
  try {
    const ok = await client.user.findUnique({ where: { username } });
    if (!ok) {
      return {
        ok: false,
        error: 'The use does not exist',
      };
    }

    await client.user.update({
      where: {
        id: loggedInUser.id,
      },
      data: {
        following: {
          disconnect: {
            username,
          },
        },
      },
    });

    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: "Can't unfollow the user",
    };
  }
};

export default {
  Mutation: {
    unfollowUser: protectedResolver2(resolverFn),
  },
};
