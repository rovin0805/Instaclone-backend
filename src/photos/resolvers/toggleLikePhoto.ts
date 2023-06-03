import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import Photo from '../photo';
import CommonResult from '@/types/common/result';
import { protectedResolver } from '@/utils/protectResolver';
import ContextType from '@/types/common/contextType';

@Resolver(Photo)
export default class ToggleLikePhotoResolver {
  @Mutation(() => CommonResult)
  @UseMiddleware(protectedResolver)
  async toggleLikePhoto(
    @Arg('id', () => Int) id: number,
    @Ctx() context: ContextType
  ) {
    try {
      const { client, loggedInUser } = context;
      const ok = await client.photo.findUnique({
        where: { id },
        select: { id: true },
      });

      if (!ok) {
        return {
          ok: false,
          error: 'The photo not found',
        };
      }

      const likes = await client.like.findUnique({
        where: {
          photoId_userId: {
            photoId: id,
            userId: loggedInUser.id,
          },
        },
      });

      if (likes) {
        await client.like.delete({ where: { id: likes.id } });
      } else {
        await client.like.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            photo: {
              connect: { id },
            },
          },
        });
      }

      return {
        ok: true,
      };
    } catch (err) {
      return {
        ok: false,
        error: "Can't like or unlike the photo",
      };
    }
  }
}
