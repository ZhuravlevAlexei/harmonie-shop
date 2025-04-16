import { getProductsForCart } from '@/actions/products';
import { ProductType } from '@/db/models/product';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const itemsIdsString = searchParams.get('itemsIds');
  const itemsIds = JSON.parse(itemsIdsString as string);
  try {
    const products: ProductType[] = await getProductsForCart(itemsIds);
    return NextResponse.json({ products });
  } catch (e) {
    console.log('Server error /cart', e);
  }
}
