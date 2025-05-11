import { cookies } from 'next/headers';

import { Orders } from '@/shared/components/Admin/Orders/Orders';

export default async function OrdersPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('harmonie_lang')?.value;
  console.log('cookieStore accessToken page: ', cookieStore.get('accessToken'));
  console.log('harmonie_lang: ', accessToken);
  return <Orders />;
}
