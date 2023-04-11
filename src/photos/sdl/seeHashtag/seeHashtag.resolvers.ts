import client from '@/client';

export default {
  Query: {
    seeHashtag: (_, { hashtag }) => {
      try {
        return client.hashtag.findUnique({
          where: { hashtag: hashtag.startsWith('#') ? hashtag : `#${hashtag}` },
        });
      } catch (err) {
        return {
          ok: false,
          error: "Can't fetch the hashtag",
        };
      }
    },
  },
};
