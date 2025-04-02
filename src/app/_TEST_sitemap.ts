import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  //example to think!!  get all products

  //   const responseAllProducts = await fetch(`http://localhost:3000/api/product`); // we have no such ruote now!!!
  //   const { products }: ProductType[] = await responseAllProducts.json();
  //   [ '1', '2', '3', '4' .....];

  //   const productEntries: MetadataRoute.Sitemap = products.map(product => ({
  //     url: `${process.env.NEXT_PUBLIC_URL}/product/${product.id}`,
  //     lastModified: new Date(product.updatedAt),
  //     // changeFrequency: 'weekly',
  //     // priority: 0.7,
  //   }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_URL}/contacts`,
      lastModified: new Date(),
    },
    // ...productEntries,
  ];
}

// {
//   url: 'https://harmonie-shop.vercel.app/',
//   lastModified: new Date(),
// },
// {
//     url: 'https://harmonie-shop.vercel.app/contacts',
//     lastModified: new Date(),
// },
// {
//     url: 'https://harmonie-shop.vercel.app/products',
//     lastModified: new Date(),
// },
