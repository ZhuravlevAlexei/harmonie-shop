'use client';
import React from 'react';

import css from './ProductPriceAndAction.module.css';
import { ApiRouts } from '@/shared/constants/common';
import { useLang } from '@/shared/hooks/useLang';
import { ProductType } from '@/db/models/product';

interface ProductPriceAndActionProps {
  id: string;
}

export const ProductPriceAndAction: React.FC<ProductPriceAndActionProps> = ({
  id,
}) => {
  const [product, setProduct] = React.useState<ProductType>({} as ProductType);
  const { lang, translations } = useLang();
  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api${ApiRouts.PRODUCTS}/${id}`);

        if (!response.ok) {
          throw new Error(`Query error: ${response.status}`);
        }
        const { product } = await response.json();
        setProduct(product);
      } catch (error) {
        console.error('ERROR in ProductPriceAndAction query:', error);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className={css.product__price_and_action}>
      <div className={css.product__item__price}>{product.price} ₴</div>
      {product.presence === 'available' && (
        <div className={css.product__item__available}>
          {product.in_stock
            ? translations[lang].product.in_stock
            : translations[lang].product.available}
        </div>
      )}
    </div>
  );
};
