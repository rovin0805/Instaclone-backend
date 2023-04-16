import { Resolver } from 'type-graphql';
import Photo from '../photo';
import SeePhoto from './seePhoto';
import UploadPhotoResolver from './uploadPhoto';
import SeeHashtagResolver from './seeHashtag';
import SearchPhotosResolver from './searchPhotos';
import EditPhotoResolver from './editPhoto';
import ToggleLikePhotoResolver from './toggleLikePhoto';

@Resolver(Photo)
export default class PhotoResolver {
  // query
  seePhoto = new SeePhoto();
  seeHashtagResolver = new SeeHashtagResolver();
  searchPhotosResolver = new SearchPhotosResolver();

  // mutation
  uploadPhotoResolver = new UploadPhotoResolver();
  editPhotoResolver = new EditPhotoResolver();
  toggleLikePhotoResolver = new ToggleLikePhotoResolver();
}
