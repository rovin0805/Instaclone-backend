import CommonResult from '@/types/common/result';
import User from '@/users/user';
import { MiddlewareFn, ResolverData } from 'type-graphql';

type ResolverType = (root: any, args: any, context: any, info: any) => any;

export const protectedResolver2 =
  (resolver: ResolverType): ResolverType | CommonResult =>
  (root: any, args: any, context: any, info: any) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: 'Please log in to perform this action.',
      };
    }
    return resolver(root, args, context, info);
  };

export const protectedResolver: MiddlewareFn<{
  loggedInUser?: User | null;
}> = async ({ context }, next) => {
  if (!context?.loggedInUser) {
    return {
      ok: false,
      error: 'Please log in to perform this action.',
    };
  }
  const result = await next();
  return result;
};
