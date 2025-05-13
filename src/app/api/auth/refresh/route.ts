import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

import connectDB from '@/db/connectDB';
import { UsersCollection } from '@/db/models/user';
import { signAccessToken } from '@/shared/utils/authTokens';

const REFRESH_SECRET = process.env.REFRESH_SECRET;

export async function POST() {
  const cookieStore = await cookies();
  await connectDB();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  if (!refreshToken) {
    return NextResponse.json(
      { error: 'Resfresh token expired, login again' },
      { status: 404 }
    );
  }
  let email = '';
  try {
    const decodedToken = jwt.verify(
      refreshToken,
      REFRESH_SECRET as string
    ) as jwt.JwtPayload;
    email = decodedToken.email;
  } catch (error) {
    console.log('error: ', error);
    return NextResponse.json(
      { error: 'Resfresh token error, login again' },
      { status: 404 }
    );
  }
  if (!email) {
    return NextResponse.json(
      { error: 'Resfresh token error, login again' },
      { status: 404 }
    );
  }
  const user = await UsersCollection.findOne({ email: email });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  const safeUser = { name: user.name, email: user.email, role: user.role };
  const accessToken = signAccessToken(safeUser);
  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 15,
  });
  return NextResponse.json({ success: true }, { status: 200 });
}
