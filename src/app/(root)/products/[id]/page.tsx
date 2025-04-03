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

    //reminder: add openGraph image (for socials) if we need in future
    // openGraph: {
    //   images: [
    //     {
    ////       this url will overwrite openGraph image placed as /app/opengraph-image.png,
    ////       (22:06 in video https://www.youtube.com/watch?v=wTGVHLyV09M)
    ////       the image itself (opengraph-image.png) we set 06:00 in video https://www.youtube.com/watch?v=wTGVHLyV09M

    //       url: product?.main_image ?? '',
    //     },
    //   ],
    // },
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
      {product && (
        <div className={css.product_page__picture}>
          {/* <img src={product?.main_image ?? undefined} alt=" Product image" /> */}
          {/* <img
            src={product?.main_image as string | undefined}
            alt=" Product image"
          /> */}
          <Image
            // className={css.logo}
            src={product?.main_image as string}
            alt="Product image"
            width={200}
            height={150}
            priority
          />
        </div>
      )}
      Product {id}
    </div>
  );
}
