import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';

import { UsersCollection } from '@/db/models/user';
import { signAccessToken, signRefreshToken } from '@/shared/utils/authTokens';
import connectDB from '@/db/connectDB';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const cookieStore = await cookies();
  await connectDB();
  const user = await UsersCollection.findOne({ email: email });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const safeUser = { name: user.name, email: user.email, role: user.role };
  const accessToken = signAccessToken(safeUser);
  const refreshToken = signRefreshToken(safeUser);

  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 15,
  });
  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  const res = NextResponse.json({ success: true }, { status: 200 });

  return res;
}
