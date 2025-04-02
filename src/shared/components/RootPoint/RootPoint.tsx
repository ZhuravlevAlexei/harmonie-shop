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
    if (!searchText) {
      useProductsStore.setState({ activeGroup: rootGroup });
      usePaginationStore.setState({
        page: 1,
        totalPages: 0,
      });
    }
  }, [groups, rootGroup, searchText]);

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
