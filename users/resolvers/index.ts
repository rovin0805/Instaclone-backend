import { Resolver } from 'type-graphql';
import User from '../user';
import CreateAccountResolver from './createAccount';
import LoginResolver from './login';
import SeeProfileResolver from './seeProfile';
import EditProfileResolver from './editProfile';
import FollowUserResolvers from './followUser';
import UnFollowUserResolvers from './unfollowUser';
import SeeFollowersResolver from './seeFollowers';

@Resolver(User)
export default class UserResolver {
  // query
  seeProfileResolver = new SeeProfileResolver();

  // mutation
  createAccountResolver = new CreateAccountResolver();
  loginResolver = new LoginResolver();
  editProfileResolver = new EditProfileResolver();
  followUserResolvers = new FollowUserResolvers();
  unfollowUserResolvers = new UnFollowUserResolvers();
  seeFollowersResolver = new SeeFollowersResolver();
}
