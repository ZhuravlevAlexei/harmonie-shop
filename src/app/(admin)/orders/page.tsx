import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { Orders } from '@/shared/components/Admin/Orders/Orders';
import { authGetUser } from '@/shared/utils/authGetUser';

export const metadata: Metadata = {
  title: 'Гармония - Заказы',
  description:
    'Административная зона сайта Гармония. Панель управления заказами.',
  robots: 'noindex, nofollow',
};

export default async function OrdersPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
  const refreshToken = cookieStore.get('refreshToken')?.value || '';
  const user = await authGetUser(accessToken);

  return (
    <Orders accessToken={accessToken} refreshToken={refreshToken} user={user} />
  );
}
