import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import { UsersCollection } from '@/db/models/user';
import { signAccessToken, signRefreshToken } from '@/actions/authTokens';
import { setAuthCookies } from '@/actions/authCookies';
import connectDB from '@/db/connectDB';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  await connectDB();
  const user = await UsersCollection.findOne({ email: email });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const plainUser = { name: user.name, email: user.email, role: user.role };
  const accessToken = signAccessToken(plainUser);
  const refreshToken = signRefreshToken(plainUser);

  const res = NextResponse.json({ success: true });
  setAuthCookies(accessToken, refreshToken);
  return res;
}
