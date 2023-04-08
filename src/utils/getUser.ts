import client from '@/client';
import * as jwt from 'jsonwebtoken';

export const getUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = jwt.verify(token, process.env.SECRET_KEY as string) as {
      id: number;
    };
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};
