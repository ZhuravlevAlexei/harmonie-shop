import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import connectDB from '@/db/connectDB';
import { OrdersCollection } from '@/db/models/order';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  //   const searchParams = req.nextUrl.searchParams;
  await connectDB();

  try {
    const orders = await OrdersCollection.find({}).sort({ orderDate: -1 });
    return NextResponse.json({ orders }, { status: 200 });
  } catch (e) {
    console.log('Server error /orders', e);
  }
}
