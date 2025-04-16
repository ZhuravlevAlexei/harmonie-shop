import { getProductByPromId } from '@/actions/products';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const awaitedParams = await Promise.resolve(params);
  try {
    const id = Number(awaitedParams.id);
    const product = await getProductByPromId(id);
    return NextResponse.json({ product });
  } catch (e) {
    console.log('Server error [id] ', e);
  }

  return NextResponse.json({});
}
