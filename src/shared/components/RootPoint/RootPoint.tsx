'use client';

import React from 'react';
import { House } from 'lucide-react';
import { SafeGroup } from '@/shared/types/types';

import { useLang } from '@/shared/hooks/useLang';
import { useProductsStore } from '@/shared/store/products';

import css from './RootPoint.module.css';
import { usePaginationStore } from '@/shared/store/pagination';

interface RootPointProps {
  rootGroup: SafeGroup;
  groups: SafeGroup[];
}

export const RootPoint: React.FC<RootPointProps> = ({ rootGroup, groups }) => {
  const { lang, translations } = useLang();
  const searchText = useProductsStore(state => state.searchText);

  React.useEffect(() => {
    useProductsStore.setState({ groups: groups });
    useProductsStore.setState({ rootGroup: rootGroup });
    // useProductsStore.setState({ products: [] });

    // useProductsStore.setState({ searchText: '' }); //не сбрасываем
    if (!searchText) {
      useProductsStore.setState({ activeGroup: rootGroup });
      usePaginationStore.setState({ page: 1 });
      usePaginationStore.setState({ totalItems: 0 });
      usePaginationStore.setState({ totalPages: 0 });
      usePaginationStore.setState({ hasNextPage: false });
      usePaginationStore.setState({ hasPreviousPage: false });
    }
  }, []);

  return (
    <div
      className={css.root_point}
      onClick={() => useProductsStore.setState({ activeGroup: rootGroup })}
    >
      <House color={'#daa520'} />
      {translations[lang].root_point}
    </div>
  );
};
