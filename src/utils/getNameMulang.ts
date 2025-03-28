import { AllowedLangs } from '@/shared/constants/common';
import { GroupType } from '@/db/models/group';
import { ProductType } from '@/db/models/product';
import { SafeGroup, SafeProduct } from '@/shared/types/types';

export const getNameMultilang = (
  product: SafeGroup | SafeProduct | GroupType | ProductType,
  lang: AllowedLangs
): string => {
  let productNameMultilang = '';
  if (lang === AllowedLangs.RU) {
    productNameMultilang = product.name_multilang?.ru || '';
  } else {
    productNameMultilang = product.name_multilang?.uk || '';
  }
  if (!productNameMultilang) {
    productNameMultilang = product.name_multilang?.ru || '';
  }
  if (!productNameMultilang) {
    productNameMultilang = product.name || '';
  }

  return productNameMultilang;
};
