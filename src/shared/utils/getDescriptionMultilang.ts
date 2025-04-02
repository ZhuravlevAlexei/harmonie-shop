import { AllowedLangs } from '@/shared/constants/common';
import { GroupType } from '@/db/models/group';
import { ProductType } from '@/db/models/product';
import { SafeGroup, SafeProduct } from '@/shared/types/types';

export const getDescriptionMultilang = (
  product: SafeGroup | SafeProduct | GroupType | ProductType,
  lang: AllowedLangs
): string => {
  let productDescriptionMultilang = '';
  if (lang === AllowedLangs.RU) {
    productDescriptionMultilang = product.description_multilang?.ru || '';
  } else {
    productDescriptionMultilang = product.description_multilang?.uk || '';
  }
  if (!productDescriptionMultilang) {
    productDescriptionMultilang = product.description_multilang?.ru || '';
  }
  if (!productDescriptionMultilang) {
    productDescriptionMultilang = product.name || '';
  }

  return productDescriptionMultilang;
};
