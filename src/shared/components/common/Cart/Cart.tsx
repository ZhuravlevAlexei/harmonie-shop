'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

import { useCartStore } from '@/shared/store/cart';
import { useLang } from '@/shared/hooks/useLang';
import { ApiRouts } from '@/shared/constants/common';
import { createSafeProducts } from '@/shared/utils/createSafeProducts';
import { fineFormattedSum } from '@/shared/utils/fineFormattedSum';
import { Button } from '../Button/Button';

import { CartItem } from '../CartItem/CartItem';

import { ProductType } from '@/db/models/product';
import { CartStateItem, SafeProduct } from '@/shared/types/types';

import css from './Cart.module.css';

interface CartProps {
  forCheckout?: boolean;
}

export const Cart: React.FC<CartProps> = ({ forCheckout = false }) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [actualCartProducts, setActualCartProducts] = React.useState<
    SafeProduct[]
  >([]);
  const { lang, translations } = useLang();
  const items = useCartStore(state => state.items);

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

  const handleContinuePurchases = () => {
    router.push('/');
  };

  return (
    <div className={css.cart_wrapper}>
      <h2 className={css.cart__title}>{translations[lang].cart.title}</h2>
      {!forCheckout && (
        <div className={css.cart__buttons}>
          <Button
            className={css.cart__button}
            onClick={handleContinuePurchases}
          >
            {translations[lang].cart.сontinue_purchases}
          </Button>
          {items.length > 0 && (
            <Button
              className={css.cart__button}
              onClick={() => router.push('/checkout')}
            >
              {translations[lang].cart.create_order}
            </Button>
          )}
        </div>
      )}
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
                forCheckout={forCheckout}
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
