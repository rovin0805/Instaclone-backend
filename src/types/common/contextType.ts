import User from '@/users/user';
import { PrismaClient } from '@prisma/client';

type ContextType = {
  loggedInUser?: User;
  client: PrismaClient;
};

export default ContextType;
