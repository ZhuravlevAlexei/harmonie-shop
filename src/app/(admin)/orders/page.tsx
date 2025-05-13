import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

import connectDB from '@/db/connectDB';
import { UsersCollection } from '@/db/models/user';

import { Orders } from '@/shared/components/Admin/Orders/Orders';

export default async function OrdersPage() {
  await connectDB();

  const ACCESS_SECRET = process.env.ACCESS_SECRET;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
  const refreshToken = cookieStore.get('refreshToken')?.value || '';
  let user = null;
  if (accessToken) {
    try {
      const decodedToken = jwt.verify(
        accessToken,
        ACCESS_SECRET as string
      ) as jwt.JwtPayload;
      const userEmail = decodedToken.email;
      const activeUser = await UsersCollection.findOne({ email: userEmail });
      if (activeUser) {
        //need a plain object for the prop
        user = {
          name: activeUser.name,
          email: activeUser.email,
          role: activeUser.role,
        };
      } else {
        console.log('User not found');
      }
    } catch (e) {
      console.log('Token decode error', e);
    }
  }

  return (
    <Orders accessToken={accessToken} refreshToken={refreshToken} user={user} />
  );
}
