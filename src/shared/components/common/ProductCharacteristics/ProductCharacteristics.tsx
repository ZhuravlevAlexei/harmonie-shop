import React from 'react';
import { nanoid } from 'nanoid';

import translations from '../../../../../public/translations.json';
import { ProductDataType } from '@/db/models/productData';
import { getLanguage } from '@/shared/utils/getLanguage';

import css from './ProductCharacteristics.module.css';
import { AllowedLangs } from '@/shared/constants/common';
import { env } from '@/shared/utils/env';

const fetchParamsUK = async (): Promise<Record<string, string>> => {
  const res = await fetch(`${env('NEXT_PUBLIC_BASE_URL')}/paramsUK.json`);
  if (!res.ok) {
    throw new Error('Не удалось загрузить параметры');
  }
  return await res.json();
};

interface ProductCharacteristicsProps {
  productData: ProductDataType;
}

export const ProductCharacteristics: React.FC<
  ProductCharacteristicsProps
> = async ({ productData }) => {
  const lang = await getLanguage();

  const { params } = productData;
  const paramsUK = await fetchParamsUK();
  if (lang === AllowedLangs.UK) {
    for (const param of params) {
      if (paramsUK[param.name as string]) {
        param.name = paramsUK[param.name as string];
      }
      if (paramsUK[param.value as string]) {
        param.value = paramsUK[param.value as string];
      }
    }
  }

  return (
    <div>
      <h2 className={css.product__characteristics__title}>
        {translations[lang].product.characteristics}
      </h2>
      <div className={css.product__characteristics}>
        {params.map(data => (
          <div key={nanoid()} className={css.product__characteristics__item}>
            <div className={css.product__characteristics__item__name}>
              {data.name}
            </div>
            <div className={css.product__characteristics__item__value}>
              {data.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
