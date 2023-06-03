export default {
  Comments: {
    isMe: ({ userId }, _, { loggedInUser }) =>
      !!loggedInUser && userId === loggedInUser.id,
  },
};
