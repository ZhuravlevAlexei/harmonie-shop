import { ProductType } from '@/db/models/product';
import { create } from 'zustand';
import { SafeGroup } from '../types/types';

interface ProductsState {
  rootGroup: SafeGroup | null;
  activeGroup: SafeGroup | null;
  searchText: string;
  groups: SafeGroup[];
  products: ProductType[];
  setRootGroup: (rootGroup: SafeGroup) => void;
  setActiveGroup: (activeGroup: SafeGroup) => void;
  setSearchText: (search: string) => void;
  setGroups: (groups: SafeGroup[]) => void;
  setProducts: (products: ProductType[]) => void;
}

export const useProductsStore = create<ProductsState>()(set => ({
  rootGroup: null,
  activeGroup: null,
  searchText: '',
  groups: [],
  products: [],
  setRootGroup: (rootGroup: SafeGroup) => set({ rootGroup }),
  setActiveGroup: (activeGroup: SafeGroup) => set({ activeGroup }),
  setSearchText: (searchText: string) => set({ searchText }),
  setGroups: (groups: SafeGroup[]) => set({ groups }),
  setProducts: (products: ProductType[]) => set({ products }),
}));
