import React from 'react';
import Link from 'next/link';

import { useOrderStore } from '@/shared/store/orders';

import { ORDER_STATUS, OrderStatusLabels } from '@/shared/constants/common';
import { OrderDocumentType } from '@/db/models/order';

import css from './OrdersItem.module.css';

const orderStatusClass = (status: string) => {
  switch (status) {
    case ORDER_STATUS.NEW:
      return css.order__new;
    case ORDER_STATUS.ACCEPTED:
      return css.order__accepted;
    case ORDER_STATUS.COMPLETED:
      return css.order__completed;
    case ORDER_STATUS.CANCELED:
      return css.order__canceled;
  }
};

const showOriginalDate = (orderDate: string) => {
  const originalDate = new Date(orderDate);
  return originalDate.toLocaleString();
};

interface OrdersItemProps {
  order: OrderDocumentType;
}

export const OrdersItem: React.FC<OrdersItemProps> = ({ order }) => {
  const { orders } = useOrderStore();
  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    order: OrderDocumentType
  ) => {
    const selectedStatus = e.target.value as ORDER_STATUS;
    try {
      const response = await fetch(`/api/orders/${String(order._id)}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: selectedStatus }),
      });
      if (response.ok) {
        const data = await response.json();
        const updatedOrder = data.order;
        const newOrders = orders.map(order => {
          if (order._id === updatedOrder._id) {
            return updatedOrder;
          }
          return order;
        });
        useOrderStore.setState({ orders: newOrders });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr key={String(order._id)} className={orderStatusClass(order.status)}>
      <td className={css.td__cell}>
        <Link href={`/orders/${String(order._id)}`}>
          <div>{order.orderNumber}</div>
          <div>{showOriginalDate(String(order.orderDate))}</div>
        </Link>
      </td>
      <td className={css.td__cell}>
        <div>
          {order.firstName} {order.lastName}
        </div>
        <div>{order.phone}</div>
      </td>
      <td className={css.td__cell}>{order.totalAmount} ₴</td>
      <td className={css.td__cell}>
        <div>{order.location}</div>
        <div>{order.deliveryLocation}</div>
        <div>{order.division}</div>
        {order.TTN && <div>ТТН: {order.TTN}</div>}
      </td>
      <td className={css.td__cell}>
        <div>
          <select
            className={css.order__select}
            value={order.status}
            onChange={e => handleSelectChange(e, order)}
          >
            <option value={ORDER_STATUS.NEW}>{OrderStatusLabels.new}</option>
            <option value={ORDER_STATUS.ACCEPTED}>
              {OrderStatusLabels.accepted}
            </option>
            <option value={ORDER_STATUS.COMPLETED}>
              {OrderStatusLabels.completed}
            </option>
            <option value={ORDER_STATUS.CANCELED}>
              {OrderStatusLabels.canceled}
            </option>
          </select>
        </div>
      </td>
    </tr>
  );
};
