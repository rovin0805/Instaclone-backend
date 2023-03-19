import { protectedResolver } from '@/utils/protectResolver';
import CommonResult from '@/types/common/result';
import EditProfileArgs from '@/types/users/editProfileAgs';
import { Args, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import User from '../user';
import client from '@/client';
import * as bcrypt from 'bcrypt';

@Resolver(User)
export default class EditProfileResolver {
  @Mutation(() => CommonResult)
  @UseMiddleware(protectedResolver)
  async editProfile(
    @Args() args: EditProfileArgs,
    @Ctx('loggedInUser') loggedInUser: User
  ): Promise<CommonResult> {
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
  }
}
