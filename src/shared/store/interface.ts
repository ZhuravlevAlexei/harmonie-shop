import { create } from 'zustand';

interface InterfaceState {
  isSearchOpen: boolean;
  setSearchIsOpen: (isSearchOpen: boolean) => void;
}

export const useInterfaceStore = create<InterfaceState>()(set => ({
  isSearchOpen: false,
  setSearchIsOpen: (isSearchOpen: boolean) => set({ isSearchOpen }),
}));
