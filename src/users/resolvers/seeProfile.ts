import client from '@/client';
import { Arg, Query, Resolver } from 'type-graphql';
import User from '../user';

@Resolver(User)
export default class SeeProfileResolver {
  @Query(() => User)
  async seeProfile(@Arg('username') username: string) {
    return client.user.findUnique({
      where: {
        username,
      },
      include: {
        followers: true,
        following: true,
      },
    });
  }
}
