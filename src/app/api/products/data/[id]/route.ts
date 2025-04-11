import { getProductDataByPromId } from '@/actions/productsData';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const awaitedParams = await Promise.resolve(params);

  try {
    const id = Number(awaitedParams.id);
    const productData = await getProductDataByPromId(id);

    return NextResponse.json({ productData });
  } catch (e) {
    console.log('Server error DATA [id] ', e);
  }

  return NextResponse.json({});
}
