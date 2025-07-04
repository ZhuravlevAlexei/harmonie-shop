'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { useShallow } from 'zustand/react/shallow';
import { Loader } from 'lucide-react';

import { useLang } from '@/shared/hooks/useLang';
import { usePaginationStore } from '@/shared/store/pagination';
import { useProductsStore } from '@/shared/store/products';
import { useCartStore } from '@/shared/store/cart';

import { Button } from '../../common/Button/Button';
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
  const [forceReRender, setForceReRender] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { lang, translations } = useLang();
  const [groups, products, searchText] = useProductsStore(
    useShallow(state => [state.groups, state.products, state.searchText])
  );
  const [page, perPage, totalPages] = usePaginationStore(
    useShallow(state => [state.page, state.perPage, state.totalPages])
  );
  const [productInCart, addCartItem] = useCartStore(
    useShallow(state => [state.productInCart, state.addCartItem])
  );

  const localGroups = groups.filter(
    group => group.parent_group_id === activeGroupId
  );

  React.useEffect(() => {
    const getDataByGroupId = async () => {
      try {
        setLoading(true);
        const { products, paginationData } = await getProductsByGroupId(
          activeGroupId,
          page,
          perPage
        );
        setStates(products, paginationData);
      } catch (error) {
        console.error(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    const getDataBySearchText = async () => {
      try {
        setLoading(true);
        const { products, paginationData } = await getProductsBySearchText(
          searchText,
          page,
          perPage
        );
        setStates(products, paginationData);
      } catch (error) {
        console.error(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
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
    <>
      {loading && (
        <div className={css.loader}>
          <Loader size={68} className="animate-spin" />
        </div>
      )}
      {!loading && searchText && products.length === 0 && (
        <div>{translations[lang].nothing_found}</div>
      )}

      {!loading &&
        products.length === 0 &&
        localGroups.length === 0 &&
        !searchText && <div>{translations[lang].no_available_products}</div>}

      {totalPages > 0 && <PaginationBlock />}

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

                <div
                  className={css.product__item__name}
                  title={getNameMultilang(product, lang)}
                >
                  {getNameMultilang(product, lang)}
                </div>
              </Link>
              <Button
                className={clsx(
                  css.product__item__button,
                  productInCart(product) && css.product__item__button_in_cart
                )}
                onClick={() => handleAddToCart(product)}
              >
                {productInCart(product)
                  ? translations[lang].cart.already_in_cart
                  : translations[lang].cart.buy}
              </Button>
            </div>
          ))}
      </div>
      {totalPages > 0 && <PaginationBlock />}
    </>
  );
};
