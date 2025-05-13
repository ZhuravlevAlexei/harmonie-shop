'use client';

import React from 'react';

import { useAuthStore } from '@/shared/store/auth';

import { SafeUser } from '@/shared/types/types';

// import css from './Orders.module.css';

interface OrdersProps {
  accessToken: string;
  refreshToken: string;
  user: SafeUser | null;
}

export const Orders: React.FC<OrdersProps> = ({
  accessToken,
  refreshToken,
  user = null,
}) => {
  React.useEffect(() => {
    async function refreshAccessToken() {
      //try to refresh access token
      await fetch('api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });
      window.location.reload();
    }
    if (!accessToken && refreshToken) refreshAccessToken();
  }, [accessToken, refreshToken]);

  if (!user) return <h3>Not authorized. Log in, please!</h3>;
  setTimeout(() => {
    useAuthStore.setState({ isLoggedIn: true, user });
  }, 100);

  return <div>ADMIN ORDERS </div>;
};
