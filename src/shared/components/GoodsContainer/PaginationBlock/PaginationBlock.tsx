import React from 'react';
import { Pagination, Stack } from '@mui/material';

import { useLang } from '@/shared/hooks/useLang';
import { usePaginationStore } from '@/shared/store/pagination';

import css from './PaginationBlock.module.css';
import { PaginationLimits } from '@/shared/constants/common';

export const PaginationBlock: React.FC = () => {
  const { lang, translations } = useLang();
  const page = usePaginationStore(state => state.page);
  const perPage = usePaginationStore(state => state.perPage);
  const totalPages = usePaginationStore(state => state.totalPages);

  const handlePaginationPageClick = (page: number) => {
    usePaginationStore.setState({ page });
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const perPage = Number(event.target.value);
    usePaginationStore.setState({ perPage });
  };

  return (
    <div className={css.pagination__container}>
      <Stack direction="row" spacing={3}>
        <Pagination
          count={Math.ceil(totalPages)}
          page={page}
          color="secondary"
          onChange={(event, page) => handlePaginationPageClick(page)}
        />
      </Stack>
      <span className={css.pagination__units__text}>
        {translations[lang].pagination_per_page}
      </span>
      <select
        className={css.pagination__units__select}
        value={perPage}
        onChange={handlePerPageChange}
      >
        <option value={PaginationLimits.LIMIT_12}>12</option>
        <option value={PaginationLimits.LIMIT_24}>24</option>
        <option value={PaginationLimits.LIMIT_36}>36</option>
      </select>
    </div>
  );
};
