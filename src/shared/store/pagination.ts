import { create } from 'zustand';
import { PaginationLimits } from '../constants/common';

interface PaginationState {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  setTotalItems: (totalItems: number) => void;
  setTotalPages: (totalPages: number) => void;
  setHasNextPage: (hasNextPage: boolean) => void;
  setHasPreviousPage: (hasPreviousPage: boolean) => void;
}

export const usePaginationStore = create<PaginationState>()(set => ({
  page: 1,
  perPage: PaginationLimits.LIMIT_12,
  totalItems: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
  setPage: page => set({ page }),
  setPerPage: perPage => set({ perPage }),
  setTotalItems: totalItems => set({ totalItems }),
  setTotalPages: totalPages => set({ totalPages }),
  setHasNextPage: hasNextPage => set({ hasNextPage }),
  setHasPreviousPage: hasPreviousPage => set({ hasPreviousPage }),
}));
