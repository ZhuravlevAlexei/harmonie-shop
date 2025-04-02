import { create } from 'zustand';
import { PaginationLimits } from '../constants/common';

interface PaginationState {
  page: number;
  perPage: number;
  totalPages: number;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  setTotalPages: (totalPages: number) => void;
}

export const usePaginationStore = create<PaginationState>()(set => ({
  page: 1,
  perPage: PaginationLimits.LIMIT_12,
  totalPages: 0,
  setPage: page => set({ page }),
  setPerPage: perPage => set({ perPage }),
  setTotalPages: totalPages => set({ totalPages }),
}));
