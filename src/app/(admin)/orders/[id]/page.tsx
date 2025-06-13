import { cookies } from 'next/headers';

import { Order } from '@/shared/components/Admin/Order/Order';
import { authGetUser } from '@/shared/utils/authGetUser';

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
  const refreshToken = cookieStore.get('refreshToken')?.value || '';
  const user = await authGetUser(accessToken);

  return (
    <Order
      id={id}
      accessToken={accessToken}
      refreshToken={refreshToken}
      user={user}
    />
  );
}
