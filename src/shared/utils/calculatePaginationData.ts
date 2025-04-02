import { PaginationData } from '@/shared/types/types';

export const calculatePaginationData = (
  count: number,
  perPage: number,
  page: number
): PaginationData => {
  const totalPages = Math.ceil(count / perPage);

  return {
    page,
    perPage,
    totalPages,
  };
};
