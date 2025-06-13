'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

import { fineFormattedSum } from '@/shared/utils/fineFormattedSum';

import { OrderDocumentType } from '@/db/models/order';

import css from './OrderProducts.module.css';

interface OrderProductsProps {
  order: OrderDocumentType;
}

export const OrderProducts: React.FC<OrderProductsProps> = ({ order }) => {
  return (
    <div>
      <h3>Товары в заказе</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th className={css.th__cell}>Фото</th>
              <th className={clsx(css.th__cell, css.th__product__name)}>
                Название
              </th>
              <th className={css.th__cell}>Цена</th>
              <th className={css.th__cell}>Количество</th>
              <th className={css.th__cell}>Сумма</th>
            </tr>
          </thead>
          <tbody>
            {order &&
              order.items.map(item => (
                <tr key={item.productId} className={css.order__item}>
                  <td className={css.td__cell}>
                    <Image
                      className={css.order__item__image}
                      src={item.main_image as string}
                      alt="Product image"
                      width={100}
                      height={100}
                      priority
                    />
                  </td>
                  <td className={css.td__cell}>
                    <Link href={`/products/${item.productId}`}>
                      {item.name}
                    </Link>
                  </td>
                  <td className={css.td__cell}>
                    {item.price?.toFixed(2)} ₴ / шт.
                  </td>
                  <td className={css.td__cell}>{item.quantity} шт.</td>
                  <td className={css.td__cell}>
                    {fineFormattedSum(
                      Number(item.price) * Number(item.quantity)
                    )}
                    ₴
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className={css.td__footer__cell}>
                Итого:
              </td>
              <td className={css.td__footer__cell}>
                {fineFormattedSum(Number(order.totalAmount))} ₴
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
