import { getProductByPromId } from '@/actions/products';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const product = await getProductByPromId(Number(id));
    return NextResponse.json({ product });
  } catch (e) {
    console.log('Server error [id] ', e);
  }

  return NextResponse.json({});
}
