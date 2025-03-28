'use client';
import React from 'react';
import Link from 'next/link';

import { useLang } from '@/shared/hooks/useLang';
import { usePaginationStore } from '@/shared/store/pagination';
import { useProductsStore } from '@/shared/store/products';

import { PaginationBlock } from '../PaginationBlock/PaginationBlock';

import {
  getProductsByGroupId,
  getProductsBySearchText,
} from '@/actions/products';
import { getNameMultilang } from '@/utils/getNameMulang';

import css from './ProductsView.module.css';

interface ProductsViewProps {
  activeGroupId: number;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  activeGroupId,
}) => {
  const { lang, translations } = useLang();
  const products = useProductsStore(state => state.products);
  const searchText = useProductsStore(state => state.searchText);
  const page = usePaginationStore(state => state.page);
  const perPage = usePaginationStore(state => state.perPage);
  const totalPages = usePaginationStore(state => state.totalPages);

  React.useEffect(() => {
    const getDataByGroupId = async () => {
      const { products, paginationData } = await getProductsByGroupId(
        activeGroupId,
        page,
        perPage
      );
      useProductsStore.setState({ products: products });
      usePaginationStore.setState({
        page: paginationData.page,
        perPage: paginationData.perPage,
        totalItems: paginationData.totalItems,
        totalPages: paginationData.totalPages,
        hasNextPage: paginationData.hasNextPage,
        hasPreviousPage: paginationData.hasPreviousPage,
      });
    };
    const getDataBySearchText = async () => {
      const { products, paginationData } = await getProductsBySearchText(
        searchText,
        page,
        perPage
      );
      useProductsStore.setState({ products: products });
      usePaginationStore.setState({
        page: paginationData.page,
        perPage: paginationData.perPage,
        totalItems: paginationData.totalItems,
        totalPages: paginationData.totalPages,
        hasNextPage: paginationData.hasNextPage,
        hasPreviousPage: paginationData.hasPreviousPage,
      });
    };

    if (searchText) {
      getDataBySearchText();
    } else {
      getDataByGroupId();
    }
  }, [activeGroupId, searchText, page, perPage]);

  // console.log('products: ', products);

  return (
    <>
      {searchText && products.length === 0 && (
        <div>{translations[lang].nothing_found}</div>
      )}
      {products.length > 0 && totalPages > 1 && <PaginationBlock />}

      <div className={css.products__list}>
        {products.length > 0 &&
          products.map(product => (
            <div className={css.product__item} key={product.id}>
              <Link
                href={`/product/${product.id}`}
                className={css.product__item__link}
              >
                <img
                  className={css.product_item__image}
                  src={product.main_image}
                  alt="Product image"
                  width={250}
                  height={270}
                />
                <div className={css.product__item__price}>
                  {product.price} ₴
                </div>
                <div className={css.product__item__name}>
                  {getNameMultilang(product, lang)}
                </div>
              </Link>
            </div>
          ))}
      </div>
      {products.length > 0 && totalPages > 1 && <PaginationBlock />}
    </>
  );
};
