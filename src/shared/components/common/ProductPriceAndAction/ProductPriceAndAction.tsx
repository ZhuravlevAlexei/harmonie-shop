'use client';
import React from 'react';
import { useShallow } from 'zustand/shallow';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';

import { ApiRouts } from '@/shared/constants/common';
import { useLang } from '@/shared/hooks/useLang';
import { useCartStore } from '@/shared/store/cart';

import { Button } from '../Button/Button';
import { getNameMultilang } from '@/shared/utils/getNameMultilang';

import { ProductType } from '@/db/models/product';
import { SafeProduct } from '@/shared/types/types';

import css from './ProductPriceAndAction.module.css';
import { createSafeProduct } from '@/shared/utils/createSafeProducts';

interface ProductPriceAndActionProps {
  id: string;
}

export const ProductPriceAndAction: React.FC<ProductPriceAndActionProps> = ({
  id,
}) => {
  const [forceReRender, setForceReRender] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [product, setProduct] = React.useState<ProductType>({} as ProductType);

  const [productInCart, addCartItem] = useCartStore(
    useShallow(state => [state.productInCart, state.addCartItem])
  );

  const { lang, translations } = useLang();
  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api${ApiRouts.PRODUCTS}/${id}`);

        if (!response.ok) {
          throw new Error(`Query error fetching price: ${response.status}`);
        }
        const { product } = await response.json();
        setProduct(product);
      } catch (error) {
        console.error('ERROR in ProductPriceAndAction query:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = (product: SafeProduct) => {
    addCartItem(product);
    setForceReRender(!forceReRender);
    toast.success(
      `${getNameMultilang(product, lang)} ${
        translations[lang].cart.added_to_cart
      }.`
    );
  };

  return (
    <div className={css.product__price_and_action}>
      {loading && (
        <div className={css.product__item__price_wrapper}>
          <Loader size={32} className="animate-spin" />
        </div>
      )}
      {!loading && product.price && (
        <div className={css.product__item__price_wrapper}>
          <div className={css.product__item__price}>{product.price} ₴</div>
          {product.presence === 'available' && (
            <div className={css.product__item__available}>
              {product.in_stock
                ? translations[lang].product.in_stock
                : translations[lang].product.available}
            </div>
          )}
          <Button
            className={css.product__button}
            onClick={() => handleAddToCart(createSafeProduct(product))}
          >
            {productInCart(createSafeProduct(product))
              ? translations[lang].cart.already_in_cart
              : translations[lang].cart.buy}
          </Button>
        </div>
      )}
    </div>
  );
};
