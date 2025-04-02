import React from 'react';

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main>
      {children}
      {modal}
    </main>
  );
}
