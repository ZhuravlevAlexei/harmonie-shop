import { ProductType } from '@/db/models/product';
import { SafeProduct } from '@/shared/types/types';

export const createSafeProducts = (products: ProductType[]): SafeProduct[] => {
  const safeProducts: SafeProduct[] = products.map(product => ({
    id: Number(product.id),
    name: String(product.name),
    name_multilang: {
      ru: product.name_multilang?.ru || '',
      uk: product.name_multilang?.uk || '',
    },
    description_multilang: {
      ru: product.description_multilang?.ru || '',
      uk: product.description_multilang?.uk || '',
    },
    selling_type: product.selling_type,
    presence: product.presence,
    in_stock: Boolean(product.in_stock),
    price: Number(product.price),
    groupId: Number(product.group?.id),
    main_image: String(product.main_image),
    status: product.status,
    quantity_in_stock: Number(product.quantity_in_stock),
    measure_unit: String(product.measure_unit),
  }));

  return safeProducts;
};
