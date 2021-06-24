import client from "../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser)
          throw new Error("This username/email is already taken.");

        const uglyPassword = await bcrypt.hash(password, 10);

        return client.user.create({
          data: {
            username,
            firstName,
            lastName,
            email,
            password: uglyPassword,
          },
        });
      } catch (error) {
        return error;
      }
    },
    login: async (_, { username, password }) => {
      // find an user with args.username
      const user = await client.user.findFirst({ where: { username } });
      if (!user) return { ok: false, error: "User Not Found." };

      // check a password with args.password
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) return { ok: false, error: "Incorrect password." };

      // issue a token and send it to the user
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return { ok: true, token };
    },
  },
};
