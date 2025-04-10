import connectDB from '@/db/connectDB';
import {
  ProductDataType,
  ProductsDataCollection,
} from '@/db/models/productData';

export async function getProductDataByPromId(
  id: number
): Promise<ProductDataType> {
  try {
    await connectDB();
    const productData = await ProductsDataCollection.findOne({ id: id });
    return productData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
