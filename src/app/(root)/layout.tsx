import { Header } from '@/shared/components/Header';
import React from 'react';

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>
        {children}
        {modal}
      </main>
      {/* <footer></footer> */}
    </>
  );
}
