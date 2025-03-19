import { Inter } from 'next/font/google';
import { Providers } from '@/shared/components';
import { Header } from '@/shared/components/Header/Header/Header';
import './globalStyles/normalize.css';
import './globalStyles/globals.css';

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
          <Header />
          {children}
          {/* <Footer/> */}
        </Providers>
      </body>
    </html>
  );
}
