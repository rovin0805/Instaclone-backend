import { Resolver } from 'type-graphql';
import User from '../user';
import CreateAccountResolver from './createAccount';
import LoginResolver from './login';
import seeProfileResolver from './seeProfile';

@Resolver(User)
export default class UserResolver {
  // query
  seeProfileResolver = new seeProfileResolver();

  // mutation
  createAccountResolver = new CreateAccountResolver();
  loginResolver = new LoginResolver();
}
