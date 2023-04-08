import { createWriteStream } from 'fs';
import client from '@/client';
import { protectedResolver2 } from '@/utils/protectResolver';
import * as bcrypt from 'bcrypt';

const resolverFn = async (
  _: any,
  {
    firstName,
    lastName,
    username,
    email,
    password: newPassword,
    bio,
    avatar,
  }: any,
  { loggedInUser }: any
) => {
  // <-- temp code, not for prod! : how to save the file w/ node
  let avatarUrl = null;
  if (avatar) {
    const { filename, createReadStream } = await avatar;
    const newFileName = loggedInUser.id + Date.now() + filename;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      process.cwd() + '/uploads/' + newFileName
    );
    readStream.pipe(writeStream);
    avatarUrl = `http://localhost:4000/static/${newFileName}`;
  }

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
      bio,
      ...(hashedPassword && { password: hashedPassword }),
      ...(avatar && { avatar: avatarUrl }),
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
