'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import { SiViber } from 'react-icons/si';

import { useAuthStore } from '@/shared/store/auth';
import { authRefreshAccessToken } from '@/shared/utils/authRefreshAccessToken';
import { Button } from '../../common/Button/Button';

import { OrderDocumentType } from '@/db/models/order';
import { OrderProducts } from '../OrderProducts/OrderProducts';

import { SafeUser } from '@/shared/types/types';

import css from './Order.module.css';
import toast from 'react-hot-toast';

interface OrderProps {
  id: string;
  accessToken: string;
  refreshToken: string;
  user: SafeUser | null;
}

export const Order: React.FC<OrderProps> = ({
  id,
  accessToken,
  refreshToken,
  user = null,
}) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [isRefreshing, setRefreshing] = React.useState(false);
  const [modified, setModified] = React.useState(false);
  const [order, setOrder] = React.useState<OrderDocumentType>();

  const deliveryString = order?.deliveryType ? order?.deliveryType : '';
  const deliveryToAddress =
    String(deliveryString) === 'Доставка кур`єром' ? true : false;

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
    try {
      const fetchOrder = async (id: string) => {
        const response = await fetch(`/api/orders/${id}`);
        if (!response.ok) {
          throw new Error(`Query (/orders/[id]) error: ${response.status}`);
        }
        const { order } = await response.json();
        setOrder(order);
      };
      setLoading(true);
      if (user) fetchOrder(id);
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id, user]);

  if (user) {
    setTimeout(() => {
      useAuthStore.setState({ isLoggedIn: true, user });
    }, 100);
  }

  const handleBack = () => {
    router.back();
  };

  const handleSetTTN = async (order: OrderDocumentType) => {
    try {
      const response = await fetch(`/api/orders/${String(order._id)}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ TTN: order.TTN }),
      });
      if (response.ok) {
        setModified(false);
        toast.success('ТТН изменен.');
      } else {
        toast.error('ТТН не изменен. Попробуйте еще раз.');
      }
    } catch (error) {
      console.error(error);
    }
  };

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
            <div>
              {!order ? (
                <h3>Ищем заказ...</h3>
              ) : (
                <div>
                  <Button className={css.back__button} onClick={handleBack}>
                    Назад
                  </Button>
                  <div className={css.order__wrapper}>
                    <div className={css.order__info}>
                      <h4>Покупатель</h4>
                      <div>
                        {order.firstName} {order.lastName}
                      </div>
                      <div>Телефон: {order.phone}</div>
                      <span className={css.order__info__viber}>
                        Viber:
                        <a
                          title="Viber - написать покупателю"
                          href={`viber://chat?number=${order.phone}`}
                        >
                          <SiViber size={20} />
                        </a>
                      </span>
                      <div>Email: {order.email}</div>
                    </div>
                    <div className={css.order__info}>
                      <h4>Доставка</h4>
                      <div>{order.deliveryType}</div>
                      <div>Город: {order.location}</div>
                      {deliveryToAddress ? (
                        <div>Адрес: {order.deliveryLocation}</div>
                      ) : (
                        <div>Отделение: {order.division}</div>
                      )}
                      <div className={css.order__info__ttn}>
                        <label htmlFor="ttn">ТТН: </label>
                        <input
                          className={css.order__info__ttn__input}
                          type="text"
                          id="ttn"
                          value={String(order.TTN)}
                          onChange={e => {
                            const newTTN = e.target.value;
                            const updatedOrder = { ...order, TTN: newTTN };
                            setOrder(updatedOrder);
                            setModified(true);
                          }}
                        />
                        <button
                          className={css.order__info__ttn__button}
                          onClick={() => handleSetTTN(order)}
                        >
                          Установить
                        </button>
                      </div>
                      {modified && (
                        <div className={css.order__ttn__modified__alert}>
                          ТТН изменен
                        </div>
                      )}
                    </div>
                  </div>
                  <OrderProducts order={order} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
