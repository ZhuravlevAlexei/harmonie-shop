import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Container } from './Container/Container';

import { toastOptions } from '@/shared/options/toast';

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      {/* add all providers here */}
      <Toaster
        toastOptions={toastOptions}
        position="top-left"
        reverseOrder={false}
      />
      <Container>{children}</Container>
    </>
  );
};
