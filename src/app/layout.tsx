import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globalStyles/normalize.css';
import './globalStyles/globals.css';
import { Providers } from '@/shared/components/common';

const nunito = Inter({
  subsets: ['cyrillic'],
  variable: '--font-inter',
  weight: ['100', '300', '400', '500', '600', '700'],
  //        	Weight
  // Thin	    100
  // Light	  300
  // Regular	400
  // Medium	  500
  // Semibold	600
  // Bold	    700
});

export const metadata: Metadata = {
  title: {
    default: 'Harmonie',
    template: '%s - Harmonie',
  },
  description:
    'Найкращі книги, іграшки, товари для спорту та туризму, товари для тварин...',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>

      <body className={nunito.variable}>
        <Providers>
          {/* <Header /> */}
          {children}
          {/* <Footer/> */}
        </Providers>
      </body>
    </html>
  );
}
