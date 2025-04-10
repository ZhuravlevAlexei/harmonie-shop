'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useLang } from '@/shared/hooks/useLang';
import { usePaginationStore } from '@/shared/store/pagination';
import { useProductsStore } from '@/shared/store/products';

import { PaginationBlock } from '../PaginationBlock/PaginationBlock';

import {
  getProductsByGroupId,
  getProductsBySearchText,
} from '@/actions/products';
import { getNameMultilang } from '@/shared/utils/getNameMultilang';

import { PaginationData, SafeProduct } from '@/shared/types/types';

import css from './ProductsView.module.css';

interface ProductsViewProps {
  activeGroupId: number;
}

const setStates = (products: SafeProduct[], paginationData: PaginationData) => {
  useProductsStore.setState({ products: products });
  usePaginationStore.setState({
    page: paginationData.page,
    perPage: paginationData.perPage,
    totalPages: paginationData.totalPages,
  });
};

export const ProductsView: React.FC<ProductsViewProps> = ({
  activeGroupId,
}) => {
  const { lang, translations } = useLang();
  const groups = useProductsStore(state => state.groups);
  const products = useProductsStore(state => state.products);
  const searchText = useProductsStore(state => state.searchText);
  const page = usePaginationStore(state => state.page);
  const perPage = usePaginationStore(state => state.perPage);
  const totalPages = usePaginationStore(state => state.totalPages);

  const localGroups = groups.filter(
    group => group.parent_group_id === activeGroupId
  );

  React.useEffect(() => {
    // console.log('ProductsView', page, perPage);
    const getDataByGroupId = async () => {
      const { products, paginationData } = await getProductsByGroupId(
        activeGroupId,
        page,
        perPage
      );
      setStates(products, paginationData);
    };
    const getDataBySearchText = async () => {
      const { products, paginationData } = await getProductsBySearchText(
        searchText,
        page,
        perPage
      );
      setStates(products, paginationData);
    };

    if (searchText) {
      getDataBySearchText();
    } else {
      getDataByGroupId();
    }
  }, [activeGroupId, searchText, page, perPage]);

  const handleClickLink = (product: SafeProduct) => {
    useProductsStore.setState({ activeProduct: product });
  };

  return (
    <>
      {searchText && products.length === 0 && (
        <div>{translations[lang].nothing_found}</div>
      )}

      {!searchText && products.length === 0 && localGroups.length === 0 && (
        <div>{translations[lang].no_available_products}</div>
      )}

      {products.length > 0 && totalPages > 1 && <PaginationBlock />}

      <div className={css.products__list}>
        {products.length > 0 &&
          products.map(product => (
            <div className={css.product__item} key={product.id}>
              <Link
                href={`/products/${product.id}`}
                className={css.product__item__link}
                onClick={() => handleClickLink(product)}
              >
                <Image
                  className={css.product_item__image}
                  src={product.main_image as string}
                  alt="Product image"
                  width={250}
                  height={270}
                  priority
                />
                <div className={css.product__item__price}>
                  {product.price} ₴
                </div>
                {product.presence === 'available' && (
                  <div className={css.product__item__available}>
                    {product.in_stock
                      ? translations[lang].product.in_stock
                      : translations[lang].product.available}
                  </div>
                )}
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
