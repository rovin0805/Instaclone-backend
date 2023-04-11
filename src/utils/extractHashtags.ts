import { REGEX_HASHTAG } from '@/constants/regex';

export const extractHashtags = (caption: string) => {
  const hashtags = caption.match(REGEX_HASHTAG) || [];
  const hashtagsObjs = hashtags.map((hashtag: string) => ({
    where: { hashtag },
    create: { hashtag },
  }));
  return hashtagsObjs;
};
