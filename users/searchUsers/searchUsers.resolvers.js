import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword, lastId }) => {
      const searchedUsers = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });

      if (searchedUsers.length === 0)
        return {
          ok: false,
          error: "No results",
        };
      else
        return {
          ok: true,
          searchedUsers,
        };
    },
  },
};
