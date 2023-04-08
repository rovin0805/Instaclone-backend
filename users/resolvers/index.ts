import { Resolver } from 'type-graphql';
import User from '../user';
import CreateAccountResolver from './createAccount';
import LoginResolver from './login';
import SeeProfileResolver from './seeProfile';
import EditProfileResolver from './editProfile';
import FollowUserResolvers from './followUser';
import UnFollowUserResolvers from './unfollowUser';
import SeeFollowersResolver from './seeFollowers';
import SeeFollowingResolver from './seeFollowing';
import SearchUsersResolver from './searchUsers';

@Resolver(User)
export default class UserResolver {
  // query
  seeProfileResolver = new SeeProfileResolver();
  seeFollowersResolver = new SeeFollowersResolver();
  seeFollowingResolver = new SeeFollowingResolver();
  searchUsersResolver = new SearchUsersResolver();

  // mutation
  createAccountResolver = new CreateAccountResolver();
  loginResolver = new LoginResolver();
  editProfileResolver = new EditProfileResolver();
  followUserResolvers = new FollowUserResolvers();
  unfollowUserResolvers = new UnFollowUserResolvers();
}
