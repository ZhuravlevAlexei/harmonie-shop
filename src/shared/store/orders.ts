import { create } from 'zustand';

import { OrderDocumentType } from '@/db/models/order';

interface OrderState {
  orders: OrderDocumentType[];
  setOrder: (orders: OrderDocumentType[]) => void;
}

export const useOrderStore = create<OrderState>(set => ({
  orders: [],
  setOrder: (orders: OrderDocumentType[]) => set({ orders }),
}));
