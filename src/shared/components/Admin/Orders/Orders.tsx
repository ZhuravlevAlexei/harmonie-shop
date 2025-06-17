'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'qs';
import { useShallow } from 'zustand/react/shallow';
import { Loader } from 'lucide-react';

import { usePaginationStore } from '@/shared/store/pagination';
import { useAuthStore } from '@/shared/store/auth';
import { useOrderStore } from '@/shared/store/orders';
import { authRefreshAccessToken } from '@/shared/utils/authRefreshAccessToken';
import { Filters } from '../Filters/Filters';
import { OrdersItem } from '../OrdersItem/OrdersItem';
import { PaginationBlock } from '../../GoodsContainer';

import { SafeUser } from '@/shared/types/types';
import { OrderDocumentType } from '@/db/models/order';

import css from './Orders.module.css';

interface OrdersProps {
  accessToken: string;
  refreshToken: string;
  user: SafeUser | null;
}

export const Orders: React.FC<OrdersProps> = ({
  accessToken,
  refreshToken,
  user = null,
}) => {
  const searchParams = useSearchParams();
  const status = searchParams.get('status'); // accepted
  const startDate = searchParams.get('startDate'); // строка даты
  const endDate = searchParams.get('endDate');
  const [page, perPage, totalPages] = usePaginationStore(
    useShallow(state => [state.page, state.perPage, state.totalPages])
  );

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [isRefreshing, setRefreshing] = React.useState(false);
  const { orders } = useOrderStore();

  let queryString = qs.stringify(
    {
      status: status,
      startDate: startDate,
      endDate: endDate,
      page: page,
      perPage: perPage,
    },
    { arrayFormat: 'comma' }
  );
  if (queryString) {
    queryString = `?${queryString}`;
  }

  React.useEffect(() => {
    async function goRefresh() {
      try {
        setRefreshing(true);
        await authRefreshAccessToken();
      } catch (e) {
        setRefreshing(false);
        console.log(e);
      } finally {
        setRefreshing(false);
      }
    }
    if (!accessToken && refreshToken) {
      goRefresh();
    }
  }, [accessToken, refreshToken]);

  React.useEffect(() => {
    async function getOrders() {
      try {
        setLoading(true);

        const resp = await fetch(`/api/orders${queryString}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (resp.status === 401) router.refresh();

        const data = await resp.json();
        const foundOrders = data.orders;
        const paginationData = data.paginationData;
        if (foundOrders) {
          useOrderStore.setState({ orders: foundOrders });
          usePaginationStore.setState({ ...paginationData });
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    if (user) getOrders();
  }, [user, accessToken, router, queryString]);

  if (user) {
    setTimeout(() => {
      useAuthStore.setState({ isLoggedIn: true, user });
    }, 100);
  }

  return (
    <>
      {!user ? (
        <div>
          <h3>Not authorized. Log in, please!</h3>
          {isRefreshing && <h3>Refreshing authorization...</h3>}
        </div>
      ) : (
        <div>
          {loading ? (
            <div className={css.loader}>
              <Loader size={68} className="animate-spin" />
            </div>
          ) : (
            <>
              <Filters />

              <div className={css.table__wrapper}>
                {orders && orders.length > 0 && (
                  <table>
                    <thead>
                      <tr>
                        <th className={css.th__cell}>Номер и дата</th>
                        <th className={css.th__cell}>Покупатель</th>
                        <th className={css.th__cell}>Сумма</th>
                        <th className={css.th__cell}>Доставка</th>
                        <th className={css.th__cell}>Статус</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order: OrderDocumentType) => (
                        <OrdersItem key={String(order._id)} order={order} />
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              {totalPages > 0 && <PaginationBlock forOrders={true} />}
            </>
          )}
        </div>
      )}
    </>
  );
};
