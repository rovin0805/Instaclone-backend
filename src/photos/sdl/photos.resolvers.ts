import client from '@/client';

export default {
  Photo: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }) =>
      client.hashtag.findMany({
        where: {
          photos: {
            some: { id },
          },
        },
      }),
    likes: ({ id }) => client.like.count({ where: { photoId: id } }),
    isMe: ({ userId }, _, { loggedInUser }) =>
      !!loggedInUser && userId === loggedInUser.id,
  },
  Hashtag: {
    photos: ({ id }, { page }) => {
      const SIZE = 5;
      return client.hashtag.findUnique({ where: { id } }).photos({
        take: SIZE,
        skip: (page - 1) * SIZE,
      });
    },
    totalPhotos: ({ id }) =>
      client.photo.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
