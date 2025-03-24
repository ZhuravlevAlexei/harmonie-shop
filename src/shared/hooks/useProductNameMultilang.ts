import { useLang } from '@/shared/hooks/useLang';
import { AllowedLangs } from '@/shared/constants/common';
import { SafeGroup } from '@/shared/types/types';
import { GroupType } from '@/db/models/group';
import { ProductType } from '@/db/models/product';

export const useProductNameMultilang = (
  product: SafeGroup | GroupType | ProductType
): string => {
  const { lang } = useLang();
  // const lang = await getLanguage(); //if server side
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
