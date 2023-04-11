import ContextType from '@/types/common/contextType';
import { extractHashtags } from '@/utils/extractHashtags';
import { protectedResolver } from '@/utils/protectResolver';
import { FileUpload } from 'graphql-upload';
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import Photo from '../photo';

@Resolver(Photo)
export default class UploadPhotoResolver {
  @Mutation(() => Photo)
  @UseMiddleware(protectedResolver)
  uploadPhoto(
    @Ctx() context: ContextType,
    // @Arg('file') file: Promise<FileUpload>,
    @Arg('file') file: string,
    @Arg('caption', { nullable: true }) caption?: string
  ) {
    try {
      const { loggedInUser, client } = context;
      let hashtagsObjs = [];

      if (caption) {
        hashtagsObjs = extractHashtags(caption);
      }

      return client.photo.create({
        data: {
          file,
          caption,
          user: {
            connect: {
              id: loggedInUser.id,
            },
          },
          ...(hashtagsObjs.length > 0 && {
            hashtags: {
              connectOrCreate: hashtagsObjs,
            },
          }),
        },
      });
    } catch (err) {
      return {
        ok: false,
        error: "Can't upload a photo",
      };
    }
  }
}
