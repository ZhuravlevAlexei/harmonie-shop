import React from 'react';

import { getLanguage } from '@/shared/utils/getLanguage';
import { getDescriptionMultilang } from '@/shared/utils/getDescriptionMultilang';

import translations from '../../../../../public/translations.json';
import { GroupType } from '@/db/models/group';

import css from './ProductDescription.module.css';

interface ProductDescriptionProps {
  product: GroupType;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = async ({
  product,
}) => {
  const lang = await getLanguage();

  return (
    <div>
      <h2 className={css.product__description__title}>
        {translations[lang].product.description}
      </h2>
      <div
        className={css.product__description}
        dangerouslySetInnerHTML={{
          __html: getDescriptionMultilang(product, lang),
        }}
      />
    </div>
  );
};
