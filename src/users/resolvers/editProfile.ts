import { protectedResolver } from '@/utils/protectResolver';
import CommonResult from '@/types/common/result';
import EditProfileArgs from '@/types/users/editProfileAgs';
import { Args, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import User from '../user';
import * as bcrypt from 'bcrypt';
import { createWriteStream } from 'fs';
import ContextType from '@/types/common/contextType';

@Resolver(User)
export default class EditProfileResolver {
  @Mutation(() => CommonResult)
  @UseMiddleware(protectedResolver)
  async editProfile(
    @Args() args: EditProfileArgs,
    @Ctx() context: ContextType
  ) {
    const { loggedInUser, client } = context;
    const {
      firstName,
      lastName,
      username,
      email,
      password: newPassword,
      bio,
      avatar,
    } = args;

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
  }
}
