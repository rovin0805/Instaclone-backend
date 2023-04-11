import ContextType from '@/types/common/contextType';
import CommonResult from '@/types/common/result';
import { extractHashtags } from '@/utils/extractHashtags';
import { protectedResolver } from '@/utils/protectResolver';
import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import Photo from '../photo';

@Resolver(Photo)
export default class EditPhotoResolver {
  @Mutation(() => CommonResult)
  @UseMiddleware(protectedResolver)
  async editPhoto(
    @Arg('id', () => Int) id: number,
    @Arg('caption') caption: string,
    @Ctx() context: ContextType
  ) {
    try {
      const { client, loggedInUser } = context;
      const oldPhoto = await client.photo.findFirst({
        where: { id, userId: loggedInUser.id },
        include: {
          hashtags: {
            select: { hashtag: true },
          },
        },
      });

      if (!oldPhoto) {
        return {
          ok: false,
          error: 'The photo not found',
        };
      }

      await client.photo.update({
        where: {
          id,
        },
        data: {
          caption,
          hashtags: {
            disconnect: oldPhoto.hashtags,
            connectOrCreate: extractHashtags(caption),
          },
        },
      });

      return {
        ok: true,
      };
    } catch (err) {
      return {
        ok: false,
        error: "Can't edit the photo",
      };
    }
  }
}
