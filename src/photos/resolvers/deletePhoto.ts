import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import Photo from '../photo';
import CommonResult from '@/types/common/result';
import { protectedResolver } from '@/utils/protectResolver';
import ContextType from '@/types/common/contextType';

@Resolver(Photo)
export default class DeletePhotoResolver {
  @Mutation(() => CommonResult)
  @UseMiddleware(protectedResolver)
  async deletePhoto(
    @Arg('id', () => Int) id: number,
    @Ctx() context: ContextType
  ) {
    try {
      const { client, loggedInUser } = context;
      const photo = await client.photo.findUnique({
        where: { id },
        select: { userId: true },
      });

      if (!photo) {
        return {
          ok: false,
          error: 'Photo not found',
        };
      } else if (photo.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: 'Not authorized',
        };
      } else {
        await client.photo.delete({ where: { id } });
        return { ok: true };
      }
    } catch (err) {
      return {
        ok: false,
        error: "Can't delete the photo",
      };
    }
  }
}
