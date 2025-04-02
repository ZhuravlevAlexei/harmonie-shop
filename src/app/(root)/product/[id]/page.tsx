import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { getLanguage } from '@/shared/utils/getLanguage';
import { getNameMultilang } from '@/shared/utils/getNameMultilang';

// import { getProductByPromId } from '@/actions/products';
import { getDescriptionMultilang } from '@/shared/utils/getDescriptionMultilang';

import css from './productPage.module.css';

export const dynamic = 'force-dynamic';

interface ProductPageProps {
  params: {
    id: string;
  };
}

//example to think!!
// export async function generateStaticParams() {
//   const responseAllProducts = await fetch(`http://localhost:3000/api/product`); // we have no such ruote now!!!
//   const { products }: ProductType[] = await responseAllProducts.json();

//   return products.map((product) => ( String(product.id) ));
//   [ '1', '2', '3', '4' .....];

// }

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const lang = await getLanguage();
  const awaitedParams = await Promise.resolve(params);
  // const product = await getProductByPromId(Number(awaitedParams.id));

  const response = await fetch(
    `http://localhost:3000/api/product/${awaitedParams.id}`
  );
  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status}`);
  }
  const { product } = await response.json();
  // console.log('Server response from API (in generateMetadata): ', product);
  return {
    title: getNameMultilang(product, lang),
    description: getDescriptionMultilang(product, lang),
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
  const awaitedParams = await Promise.resolve(params);
  // const product = await getProductByPromId(Number(awaitedParams.id));
  // console.log('product from action: ', product);

  const response = await fetch(
    `http://localhost:3000/api/product/${awaitedParams.id}`
  );

  if (response.status === 404) {
    notFound();
  }
  if (!response.ok) {
    notFound();
    throw new Error(`Ошибка запроса: ${response.status}`);
  }
  const { product } = await response.json();

  if (!product) {
    notFound();
    throw new Error(`Product not found: ${awaitedParams.id}`);
  }

  // console.log('product from API: ', product);

  return (
    <div className={css.product_page}>
      {product && (
        <div className={css.product_page__picture}>
          {/* <img src={product?.main_image ?? undefined} alt=" Product image" /> */}
          <img
            src={product?.main_image as string | undefined}
            alt=" Product image"
          />
        </div>
      )}
      Product {awaitedParams.id}
    </div>
  );
}
