import { create } from 'zustand';
import { SafeUser } from '../types/types';

interface AuthState {
  isLoggedIn: boolean;
  user: SafeUser | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: SafeUser | null) => void;
}

export const useAuthStore = create<AuthState>()(set => ({
  isLoggedIn: false,
  user: null,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  setUser: (user: SafeUser | null) => set({ user }),
}));
