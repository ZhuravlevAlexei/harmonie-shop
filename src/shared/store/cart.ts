import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { CartStateItem, SafeProduct } from '../types/types';

interface CartState {
  loading: boolean;
  totalQty: number;
  totalAmount: number;
  items: CartStateItem[];
  setLoading: (loading: boolean) => void;
  // setTotalAmount: (totalAmount: number) => void;
  setTotalAmount: (actualCartProducts: SafeProduct[]) => void;
  setCart: (cart: CartStateItem[]) => void;
  addCartItem: (item: SafeProduct) => void;
  removeCartItem: (item: SafeProduct) => void;
  clearCart: () => void;
  minusOneQty: (item: SafeProduct) => void;
  productInCart: (item: SafeProduct) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      loading: false,
      totalQty: 0,
      totalAmount: 0,
      items: [],
      setLoading: (loading: boolean) => set({ loading }),
      // setTotalAmount: (totalAmount: number) => set({ totalAmount }),
      setCart: (items: CartStateItem[]) => set({ items }),
      setTotalAmount: (actualCartProducts: SafeProduct[]) => {
        const items = get().items;
        let total = 0;
        for (const item of items) {
          const product = actualCartProducts.find(
            product => product.id === item.product.id
          );
          if (product) {
            total += product.price * item.quantity;
          }
        }
        set({ totalAmount: total });
      },

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
          set({
            totalQty: totalQty - existingItem.quantity,
            items: items.filter(item => item.product.id !== product.id),
          });
        }
      },

      clearCart: () => {
        set({ totalQty: 0, items: [] });
      },
      minusOneQty: (product: SafeProduct) => {
        const items = get().items;
        const totalQty = get().totalQty;
        const existingItem = items.find(item => item.product.id === product.id);
        if (existingItem) {
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
