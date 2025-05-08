'use server';

import connectDB from '../db/connectDB';
// import { sendEmailsAboutOrder } from '@/shared/helpers/sendEmailsAboutOrder';

import { OrdersCollection, OrderType } from '../db/models/order';
import { getNextOrderNumber } from '@/shared/utils/getNextOrderNumber';

export async function createOrder(order: OrderType): Promise<boolean> {
  try {
    await connectDB();

    order.orderNumber = await getNextOrderNumber();

    const newOrder = await OrdersCollection.create(order);
    if (!newOrder) {
      return false;
    }

    // await sendEmailsAboutOrder(order);

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
