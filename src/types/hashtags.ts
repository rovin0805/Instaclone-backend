import Photo from '@/photos/photo';
import { IsInt } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class Hashtags {
  @Field(() => ID)
  @IsInt()
  id: number;

  @Field()
  hashtag: string;

  @Field(() => [Photo])
  photos: Photo[];
}
