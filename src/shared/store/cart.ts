import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { CartStateItem, SafeProduct } from '../types/types';

interface CartState {
  loading: boolean;
  totalQty: number;
  items: CartStateItem[];
  setLoading: (loading: boolean) => void;
  setCart: (cart: CartStateItem[]) => void;
  addCartItem: (item: SafeProduct) => void;
  removeCartItem: (item: SafeProduct) => void;
  minusOneQty: (item: SafeProduct) => void;
  productInCart: (item: SafeProduct) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      loading: false,
      totalQty: 0,
      items: [],
      setLoading: (loading: boolean) => set({ loading }),
      setCart: (items: CartStateItem[]) => set({ items }),

      productInCart: (product: SafeProduct) => {
        const items = get().items;
        return items.some(item => item.product.id === product.id);
      },

      addCartItem: (product: SafeProduct) => {
        const items = get().items;
        const totalQty = get().totalQty;
        const existingItem = items.find(item => item.product.id === product.id);

        if (existingItem) {
          set({
            totalQty: totalQty + 1,
            items: items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            totalQty: totalQty + 1,
            items: [...items, { product, quantity: 1, price: 0 }],
          });
        }
      },

      removeCartItem: (product: SafeProduct) => {
        const items = get().items;
        const totalQty = get().totalQty;
        const existingItem = items.find(item => item.product.id === product.id);
        if (existingItem) {
          // if item exists in cart, remove it absolutely
          set({
            totalQty: totalQty - existingItem.quantity,
            items: items.filter(item => item.product.id !== product.id),
          });
        }
      },

      minusOneQty: (product: SafeProduct) => {
        const items = get().items;
        const totalQty = get().totalQty;
        const existingItem = items.find(item => item.product.id === product.id);
        if (existingItem) {
          // if item exists in cart, remove it absolutely
          set({
            totalQty: totalQty - 1,
            items: items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          });
        }
      },
    }),

    {
      name: 'cart-items',
      partialize: state => ({
        totalQty: state.totalQty,
        items: state.items,
      }),
    }
  )
);
