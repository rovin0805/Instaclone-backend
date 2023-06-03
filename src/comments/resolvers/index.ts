import { Resolver } from 'type-graphql';
import Comments from '../comments';
import CreateCommentResolver from './createComment';

@Resolver(Comments)
export default class CommentsResolver {
  // query

  // mutation
  createCommentResolver = new CreateCommentResolver();
}
