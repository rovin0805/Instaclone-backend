import { Resolver } from 'type-graphql';
import Photo from '../photo';
import SeePhoto from './seePhoto';
import UploadPhotoResolver from './uploadPhoto';
import SeeHashtagResolver from './seeHashtag';
import SearchPhotosResolver from './searchPhotos';
import EditPhotoResolver from './editPhoto';
import ToggleLikePhotoResolver from './toggleLikePhoto';
import SeePhotoLikesResolver from './seePhotoLikes';
import SeeFeedResolver from './seeFeed';
import SeePhotoComments from './seePhotoComments';

@Resolver(Photo)
export default class PhotoResolver {
  // query
  seePhoto = new SeePhoto();
  seeHashtagResolver = new SeeHashtagResolver();
  searchPhotosResolver = new SearchPhotosResolver();
  seePhotoLikesResolver = new SeePhotoLikesResolver();
  seeFeedResolver = new SeeFeedResolver();
  seePhotoComments = new SeePhotoComments();

  // mutation
  uploadPhotoResolver = new UploadPhotoResolver();
  editPhotoResolver = new EditPhotoResolver();
  toggleLikePhotoResolver = new ToggleLikePhotoResolver();
}
