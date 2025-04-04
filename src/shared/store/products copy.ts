import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { SafeGroup, SafeProduct } from '../types/types';

interface ProductsState {
  rootGroup: SafeGroup | null;
  activeGroup: SafeGroup | null;
  searchText: string;
  groups: SafeGroup[];
  products: SafeProduct[];
  setRootGroup: (rootGroup: SafeGroup) => void;
  setActiveGroup: (activeGroup: SafeGroup) => void;
  setSearchText: (search: string) => void;
  setGroups: (groups: SafeGroup[]) => void;
  setProducts: (products: SafeProduct[]) => void;
}

export const useProductsStore = create<ProductsState>()(
  persist(
    set => ({
      rootGroup: null,
      activeGroup: null,
      searchText: '',
      groups: [],
      products: [],
      setRootGroup: (rootGroup: SafeGroup) => set({ rootGroup }),
      setActiveGroup: (activeGroup: SafeGroup) => set({ activeGroup }),
      setSearchText: (searchText: string) => set({ searchText }),
      setGroups: (groups: SafeGroup[]) => set({ groups }),
      setProducts: (products: SafeProduct[]) => set({ products }),
    }),
    {
      name: 'products-storage', // Ключ в localStorage
      partialize: state => ({
        rootGroup: state.rootGroup,
        activeGroup: state.activeGroup,
        searchText: state.searchText,
        groups: state.groups,
        products: state.products,
      }), // Указываем, какие поля сохранять
    }
  )
);
