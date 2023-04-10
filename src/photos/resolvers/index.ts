import { Resolver } from 'type-graphql';
import Photo from '../photo';
import UploadPhotoResolver from './uploadPhoto';

@Resolver(Photo)
export default class PhotoResolver {
  // query
  // mutation
  uploadPhotoResolver = new UploadPhotoResolver();
}
