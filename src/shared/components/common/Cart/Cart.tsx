'use client';
import React from 'react';

import { useCartStore } from '@/shared/store/cart';
import { useLang } from '@/shared/hooks/useLang';
import { ApiRouts } from '@/shared/constants/common';
import { createSafeProducts } from '@/shared/utils/createSafeProducts';
import { CartItem } from '../CartItem/CartItem';

import { ProductType } from '@/db/models/product';
import { CartStateItem, SafeProduct } from '@/shared/types/types';

import css from './Cart.module.css';
import { Loader } from 'lucide-react';
import { fineFormattedSum } from '@/shared/utils/fineFormattedSum';

export const Cart: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [actualCartProducts, setActualCartProducts] = React.useState<
    SafeProduct[]
  >([]);
  const { lang, translations } = useLang();
  const items = useCartStore(state => state.items);
  //   console.log('items: ', items);

  React.useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        setLoading(true);
        const itemsIds = items.map(item => item.product.id);
        const query = new URLSearchParams({
          itemsIds: JSON.stringify(itemsIds),
        }).toString();
        const response = await fetch(`/api${ApiRouts.CART}?${query}`);

        if (!response.ok) {
          throw new Error(`Query error in CART: ${response.status}`);
        }
        const { products }: { products: ProductType[] } = await response.json();
        const safeProducts = createSafeProducts(products);

        setActualCartProducts(safeProducts);
        // const productsWithPrice = safeProducts.map(product => {
        //   const item = items.find(item => item.product.id === product.id);
        //   if (item) {
        //     return {
        //       ...item,
        //       quantity: item.quantity,
        //       price: Number(product.price),
        //     };
        //   } else {
        //     return { product, quantity: 0, price: 0 };
        //   }
        // });
        // const skipEmptyItems = productsWithPrice.filter(
        //   item => item.quantity > 0
        // );
        // setCartProducts(skipEmptyItems);
      } catch (error) {
        setLoading(false);
        console.error('ERROR in CART query:', error);
      } finally {
        setLoading(false);
      }
    };
    if (items.length > 0 && actualCartProducts.length === 0) {
      fetchCartProducts();
    }
  }, [items, actualCartProducts]);

  const calcCartTotal = (
    items: CartStateItem[],
    actualCartProducts: SafeProduct[]
  ) => {
    let total = 0;
    for (const item of items) {
      const product = actualCartProducts.find(
        product => product.id === item.product.id
      );
      if (product) {
        total += product.price * item.quantity;
      }
    }
    return fineFormattedSum(total);
  };

  return (
    <div className={css.cart_wrapper}>
      <h2 className={css.cart__title}>{translations[lang].cart.title}</h2>
      <div className={css.cart}>
        {loading ? (
          <Loader size={68} className="animate-spin" />
        ) : items.length === 0 ? (
          <p>{translations[lang].cart.empty}</p>
        ) : (
          <div>
            {items.map(item => (
              <CartItem
                key={item.product.id}
                cartItem={item}
                actualCartProducts={actualCartProducts}
                lang={lang}
              />
            ))}
            <span className={css.cart__total}>
              {translations[lang].cart.total}:{' '}
              {calcCartTotal(items, actualCartProducts)} ₴
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
