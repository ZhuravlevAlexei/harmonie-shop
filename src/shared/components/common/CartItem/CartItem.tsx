'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { useShallow } from 'zustand/shallow';
import { CircleMinus, CirclePlus, Trash2 } from 'lucide-react';

import { useCartStore } from '@/shared/store/cart';
import { useProductsStore } from '@/shared/store/products';
import { fineFormattedSum } from '@/shared/utils/fineFormattedSum';
import { getNameMultilang } from '@/shared/utils/getNameMultilang';

import { Button } from '../Button/Button';
import { CartStateItem } from '@/shared/types/types';
import { AllowedLangs } from '@/shared/constants/common';

import { SafeProduct } from '@/shared/types/types';

import css from './CartItem.module.css';

interface CartItemProps {
  cartItem: CartStateItem;
  actualCartProducts: SafeProduct[];
  lang: AllowedLangs;
  forCheckout?: boolean;
}

export const CartItem: React.FC<CartItemProps> = ({
  cartItem,
  actualCartProducts,
  lang,
  forCheckout = false,
}) => {
  const actualProduct = actualCartProducts.find(
    product => product.id === cartItem.product.id
  );

  const [setTotalAmount, addCartItem, minusOneQty] = useCartStore(
    useShallow(state => [
      state.setTotalAmount,
      state.addCartItem,
      state.minusOneQty,
    ])
  );

  if (!actualProduct) {
    return <>Внимание, ошибка, пропуск строки!!!</>;
  }

  const handleQtyPlus = (product: SafeProduct) => {
    addCartItem(product);
    setTotalAmount(actualCartProducts);
  };

  const handleQtyMinus = (product: SafeProduct) => {
    minusOneQty(product);
    setTotalAmount(actualCartProducts);
  };

  const handleRemoveFromCart = (product: SafeProduct) => {
    useCartStore.getState().removeCartItem(product);
  };

  const calcCartLine = (qty: number, price: number) => {
    const total = price * qty;
    return fineFormattedSum(total);
  };

  const handleRouteToProductPage = (product: SafeProduct) => {
    const activeGroup = useProductsStore
      .getState()
      .groups.find(group => group.id === product.groupId);

    useProductsStore.setState({ activeGroup: activeGroup });
  };

  return (
    <div className={css.cart__item}>
      <Image
        className={css.cart__item__image}
        src={cartItem.product.main_image as string}
        alt="Product image"
        width={100}
        height={100}
        priority
      />

      <div
        className={clsx(
          css.cart__item__name,
          forCheckout && css.cart__item__checkout__name
        )}
        title={getNameMultilang(cartItem.product, lang)}
      >
        <Link
          className={css.cart__item__name__link}
          href={`/products/${cartItem.product.id}`}
          onClick={() => handleRouteToProductPage(cartItem.product)}
        >
          {getNameMultilang(cartItem.product, lang)}
        </Link>
      </div>

      <span className={css.cart__item__price}>
        {actualProduct.price.toFixed(2)} ₴ / шт.
      </span>
      <div className={css.cart__item__quantity__wrapper}>
        <Button
          className={css.cart__item__button}
          onClick={() => handleQtyMinus(cartItem.product)}
          disabled={cartItem.quantity === 1}
        >
          <CircleMinus />
        </Button>

        <span className={css.cart__item__quantity}>{cartItem.quantity}</span>

        <Button
          className={css.cart__item__button}
          onClick={() => handleQtyPlus(cartItem.product)}
        >
          <CirclePlus />
        </Button>
      </div>
      <div className={css.cart__item__totalLine__wrapper}>
        <span className={css.cart__item__totalLine}>
          {calcCartLine(cartItem.quantity, actualProduct.price)} ₴
        </span>

        <Button
          className={css.cart__item__button}
          onClick={() => handleRemoveFromCart(cartItem.product)}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};
