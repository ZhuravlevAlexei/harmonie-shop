import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import mongoose from 'mongoose';

import connectDB from '@/db/connectDB';
import { OrdersCollection } from '@/db/models/order';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await connectDB();
  const { id } = await params;
  try {
    const order = await OrdersCollection.findOne({ _id: id });
    return NextResponse.json({ order }, { status: 200 });
  } catch (e) {
    console.log('Server error /orders/[id]', e);
  }
  return NextResponse.json({});
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  try {
    const mongoObjectId = new mongoose.Types.ObjectId(id);

    const order = await OrdersCollection.findOneAndUpdate(
      { _id: mongoObjectId },
      { $set: body },
      { new: true }
    );
    return NextResponse.json({ order }, { status: 200 });
  } catch (e) {
    console.log('Server error /orders/[id]', e);
  }

  return NextResponse.json({});
}
