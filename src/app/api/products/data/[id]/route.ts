import { getProductDataByPromId } from '@/actions/productsData';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const productData = await getProductDataByPromId(Number(id));

    return NextResponse.json({ productData });
  } catch (e) {
    console.log('Server error DATA [id] ', e);
  }

  return NextResponse.json({});
}
