import { create } from 'zustand';

interface InterfaceState {
  isSearchOpen: boolean;
  isDirectLinkToPage: boolean;
  setSearchIsOpen: (isSearchOpen: boolean) => void;
  setDirectLinkToPage: (isDirectLinkToPage: boolean) => void;
}

export const useInterfaceStore = create<InterfaceState>()(set => ({
  isSearchOpen: false,
  isDirectLinkToPage: true,
  setSearchIsOpen: (isSearchOpen: boolean) => set({ isSearchOpen }),
  setDirectLinkToPage: (isDirectLinkToPage: boolean) =>
    set({ isDirectLinkToPage }),
}));
