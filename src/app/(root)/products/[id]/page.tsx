import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { getLanguage } from '@/shared/utils/getLanguage';
import { getNameMultilang } from '@/shared/utils/getNameMultilang';

import { ApiRouts } from '@/shared/constants/common';
import {
  ProductDescription,
  ProductGallery,
  ProductPriceAndAction,
} from '@/shared/components/common';
import { ProductCharacteristics } from '@/shared/components/common';

import { env } from '@/shared/utils/env';
import { getDescriptionMultilang } from '@/shared/utils/getDescriptionMultilang';
import { Breadcrumbs } from '@/shared/components';

import css from './ProductPage.module.css';

const baseProductQuery = `${env('NEXT_PUBLIC_BASE_URL')}${env(
  'NEXT_PUBLIC_API_URL'
)}${ApiRouts.PRODUCTS}`;

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// example to think!!
// export async function generateStaticParams() {
//   const responseAllProducts = await fetch(`http://localhost:3000/api/product`); // we have no such ruote now!!!
//   const { products }: ProductType[] = await responseAllProducts.json();

//   return products.map((product) => ( String(product.id) ));
//   [ '1', '2', '3', '4' .....];

// }

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const lang = await getLanguage();

  const response = await fetch(`${baseProductQuery}/${id}`);
  if (!response.ok) {
    throw new Error(`Query error: ${response.status}`);
  }
  const { product } = await response.json();
  if (!product) {
    throw new Error(`Query error - product not found: ${response.status}`);
  }

  let descriptionStr: string = getDescriptionMultilang(product, lang);
  descriptionStr =
    descriptionStr.length > 198
      ? descriptionStr.slice(0, 198) + '…'
      : descriptionStr;

  return {
    title: getNameMultilang(product, lang),
    description: descriptionStr,
    keywords: product?.keywords ?? '',
    robots: 'index, follow',
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const lang = await getLanguage();

  //product
  const response = await fetch(`${baseProductQuery}/${id}`);
  if (response.status === 404) {
    notFound();
  }
  if (!response.ok) {
    throw new Error(`Query error: ${response.status}`);
  }
  const { product } = await response.json();

  if (!product) {
    throw new Error(`Query error - product not found: ${response.status}`);
  }

  //product data
  const baseDataQuery = `${env('NEXT_PUBLIC_BASE_URL')}${env(
    'NEXT_PUBLIC_API_URL'
  )}${ApiRouts.PRODUCTS_DATA}`;
  const dataResponse = await fetch(`${baseDataQuery}/${id}`);
  const { productData } = await dataResponse.json();

  //images
  let images: { original: string; thumbnail: string }[] = [];
  if (productData.images.length > 0) {
    images = productData.images.map((image: string) => {
      return {
        original: image,
        thumbnail: image,
      };
    });
  } else {
    images = product.images.map(
      (image: { url: string; thumbnail_url: string; id: number }) => {
        return {
          original: image.url,
          thumbnail: image.thumbnail_url,
        };
      }
    );
  }

  return (
    <>
      <div className={css.product_page}>
        <Breadcrumbs />
        <div className={css.product_page__name}>
          <h3>{getNameMultilang(product, lang)}</h3>
        </div>
        <div className={css.product_page__viewer}>
          <ProductGallery images={images} />
        </div>
        <div className={css.product_page__product}>
          <ProductPriceAndAction id={id} />
          {productData.params.length > 0 && (
            <ProductCharacteristics productData={productData} />
          )}
        </div>
      </div>
      <ProductDescription product={product} />
    </>
  );
}
