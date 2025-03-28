import { PaginationData } from '@/shared/types/types';

export const calculatePaginationData = (
  count: number,
  perPage: number,
  page: number
): PaginationData => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = Boolean(totalPages - page);
  const hasPreviousPage = page !== 1;

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
