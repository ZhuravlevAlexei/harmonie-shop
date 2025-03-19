'use server';

import { ProductsCollection } from '@/db/models/product';
import connectDB from '@/db/connectDB';

export async function getProducts() {
  try {
    await connectDB();
    const products = JSON.parse(
      JSON.stringify(await ProductsCollection.find().limit(10))
    );

    return { products };
  } catch (error) {
    return { errMsg: error };
  }
}
