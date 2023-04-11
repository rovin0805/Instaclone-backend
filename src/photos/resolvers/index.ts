import { Resolver } from 'type-graphql';
import Photo from '../photo';
import SeePhoto from './seePhoto';
import UploadPhotoResolver from './uploadPhoto';
import SeeHashtagResolver from './seeHashtag';

@Resolver(Photo)
export default class PhotoResolver {
  // query
  seePhoto = new SeePhoto();
  seeHashtagResolver = new SeeHashtagResolver();

  // mutation
  uploadPhotoResolver = new UploadPhotoResolver();
}
