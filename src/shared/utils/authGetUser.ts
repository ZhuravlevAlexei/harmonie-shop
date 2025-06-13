import jwt from 'jsonwebtoken';

import connectDB from '@/db/connectDB';
import { UsersCollection } from '@/db/models/user';

import { ROLES } from '@/shared/constants/common';

export async function authGetUser(accessToken: string) {
  await connectDB();

  if (!accessToken) return null;

  try {
    const ACCESS_SECRET = process.env.ACCESS_SECRET;
    const decodedToken = jwt.verify(
      accessToken,
      ACCESS_SECRET as string
    ) as jwt.JwtPayload;
    const userEmail = decodedToken.email;
    const activeUser = await UsersCollection.findOne({ email: userEmail });
    if (activeUser) {
      //need a plain object for the prop
      if (
        activeUser.role === ROLES.ADMIN ||
        activeUser.role === ROLES.MANAGER
      ) {
        return {
          name: activeUser.name,
          email: activeUser.email,
          role: activeUser.role,
        };
      }
    } else {
      console.log('User not found');
    }
  } catch (e) {
    console.log('Token decode error', e);
  }

  return null;
}
