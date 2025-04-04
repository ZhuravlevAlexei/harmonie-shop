import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { getLanguage } from '@/shared/utils/getLanguage';
import { getNameMultilang } from '@/shared/utils/getNameMultilang';

import { ApiRouts } from '@/shared/constants/common';

import { env } from '@/shared/utils/env';
import { getDescriptionMultilang } from '@/shared/utils/getDescriptionMultilang';

import css from './productPage.module.css';
import { Breadcrumbs } from '@/shared/components';

const baseProductQueryTemplate = `${env('NEXT_PUBLIC_BASE_URL')}${env(
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

  const response = await fetch(`${baseProductQueryTemplate}/${id}`);
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

  const response = await fetch(`${baseProductQueryTemplate}/${id}`);
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

  return (
    <div className={css.product_page}>
      <Breadcrumbs />
      <div className={css.product_page__viewer}>
        {/* <div></div> */}
        {/* <img
          className={css.product_page_viewer__image}
          src={product?.images[0].url as string}
          alt="Product image"
        /> */}
        <Image
          className={css.product_page_viewer__image}
          // src={product?.main_image as string}
          src={product?.images[0].url as string}
          alt="Product image"
          width={300}
          height={450}
          priority
        />
      </div>
    </div>
  );
}
