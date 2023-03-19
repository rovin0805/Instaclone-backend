import client from '@/client';
import { protectedResolver2 } from '@/utils/protectResolver';
import * as bcrypt from 'bcrypt';

const resolverFn = async (
  _: any,
  { firstName, lastName, username, email, password: newPassword }: any,
  { loggedInUser }: any
) => {
  let hashedPassword = null;
  if (newPassword) {
    hashedPassword = await bcrypt.hash(newPassword, 10);
  }

  const updatedUser = await client.user.update({
    where: { id: loggedInUser?.id },
    data: {
      firstName,
      lastName,
      username,
      email,
      ...(hashedPassword && { password: hashedPassword }),
    },
  });

  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: 'Could not update profile.',
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver2(resolverFn),
  },
};