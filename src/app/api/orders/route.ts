import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import connectDB from '@/db/connectDB';
import { OrdersCollection } from '@/db/models/order';
import { calculatePaginationData } from '@/shared/utils/calculatePaginationData';

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const page = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 12;

  await connectDB();

  try {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const ordersQuery = OrdersCollection.find();
    if (status) {
      if (status !== 'all') {
        ordersQuery.where('status').equals(status);
      }
    }
    if (startDate) {
      const parsedDate = new Date(startDate);
      if (!isNaN(parsedDate.getTime())) {
        ordersQuery.where('orderDate').gte(parsedDate as unknown as number);
      }
    }
    if (endDate) {
      const parsedDate = new Date(endDate);
      if (!isNaN(parsedDate.getTime())) {
        ordersQuery.where('orderDate').lte(parsedDate as unknown as number);
      }
    }
    const [ordersCount, orders] = await Promise.all([
      OrdersCollection.find().merge(ordersQuery).countDocuments(),
      ordersQuery.skip(skip).limit(limit).sort({ orderDate: -1 }).exec(),
    ]);

    const paginationData = calculatePaginationData(ordersCount, perPage, page);

    if (!orders) {
      return NextResponse.json({ error: 'Orders not found' }, { status: 404 });
    }
    return NextResponse.json({ orders, paginationData }, { status: 200 });
  } catch (e) {
    console.log('Server error /orders', e);
  }
}
