import client from '@/client';
import { extractHashtags } from '@/utils/extractHashtags';
import { protectedResolver2 } from '@/utils/protectResolver';

const resolverFn = (_, { file, caption }, { loggedInUser }) => {
  try {
    let hashtagsObjs = [];
    if (caption) {
      hashtagsObjs = extractHashtags(caption);
    }

    return client.photo.create({
      data: {
        file,
        caption,
        user: { connect: { id: loggedInUser.id } },
        ...(hashtagsObjs.length > 0 && {
          hashtags: {
            connectOrCreate: hashtagsObjs,
          },
        }),
      },
    });
  } catch (err) {
    return {
      ok: false,
      error: "Can't upload a photo",
    };
  }
};

export default {
  Mutation: {
    uploadPhoto: protectedResolver2(resolverFn),
  },
};
