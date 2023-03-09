import CommonResult from '@/types/common/result';
import EditProfileArgs from '@/types/users/editProfileAgs';
import { Args, Mutation, Resolver } from 'type-graphql';
import User from '../user';
import client from '@/client';
import * as bcrypt from 'bcrypt';

@Resolver(User)
export default class EditProfileResolver {
  @Mutation(() => CommonResult)
  async editProfile(@Args() args: EditProfileArgs): Promise<CommonResult> {
    const {
      firstName,
      lastName,
      username,
      email,
      password: newPassword,
    } = args;

    let hashedPassword = null;
    if (newPassword) {
      hashedPassword = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await client.user.update({
      where: { id: 1 }, // TODO: check authentication
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
  }
}
