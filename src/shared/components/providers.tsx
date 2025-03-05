'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      {/* add all providers here */}
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </>
  );
};
