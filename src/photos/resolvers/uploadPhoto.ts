import ContextType from '@/types/common/contextType';
import { extractHashtags } from '@/utils/extractHashtags';
import { protectedResolver } from '@/utils/protectResolver';
import { FileUpload } from 'graphql-upload';
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import Photo from '../photo';
import CommonResult from '@/types/common/result';

@ObjectType()
class UploadPhotoResult extends CommonResult {
  @Field(() => Photo, { nullable: true })
  photo?: Photo;
}

@Resolver(Photo)
export default class UploadPhotoResolver {
  @Mutation(() => UploadPhotoResult)
  @UseMiddleware(protectedResolver)
  async uploadPhoto(
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

      const photo = await client.photo.create({
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

      return {
        ok: true,
        photo,
      };
    } catch (err) {
      return {
        ok: false,
        error: "Can't upload the photo",
      };
    }
  }
}
