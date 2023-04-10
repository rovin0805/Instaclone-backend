import { Resolver } from 'type-graphql';
import Photo from '../photo';
import SeePhoto from './seePhoto';
import UploadPhotoResolver from './uploadPhoto';

@Resolver(Photo)
export default class PhotoResolver {
  // query
  seePhoto = new SeePhoto();

  // mutation
  uploadPhotoResolver = new UploadPhotoResolver();
}
