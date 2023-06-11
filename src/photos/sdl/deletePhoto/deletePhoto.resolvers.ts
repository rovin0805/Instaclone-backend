import client from '@/client';
import { protectedResolver2 } from '@/utils/protectResolver';

const resolverFn = async (_, { id }, { loggedInUser }) => {
  try {
    const photo = await client.photo.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!photo) {
      return {
        ok: false,
        error: 'Photo not found',
      };
    } else if (photo.userId !== loggedInUser.id) {
      return {
        ok: false,
        error: 'Not authorized',
      };
    } else {
      await client.photo.delete({ where: { id } });
      return { ok: true };
    }
  } catch (err) {
    return {
      ok: false,
      error: "Can't delete the photo",
    };
  }
};

export default {
  Mutation: {
    deletePhoto: protectedResolver2(resolverFn),
  },
};
