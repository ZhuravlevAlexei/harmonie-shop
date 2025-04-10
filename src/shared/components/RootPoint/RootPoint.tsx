'use client';

import React from 'react';
import { ListOrdered } from 'lucide-react';
import { SafeGroup } from '@/shared/types/types';

import { useLang } from '@/shared/hooks/useLang';
import { useProductsStore } from '@/shared/store/products';

import css from './RootPoint.module.css';

interface RootPointProps {
  rootGroup: SafeGroup;
  groups: SafeGroup[];
}

export const RootPoint: React.FC<RootPointProps> = ({ rootGroup, groups }) => {
  const { lang, translations } = useLang();
  const searchText = useProductsStore(state => state.searchText);
  const activeGroup = useProductsStore(state => state.activeGroup);

  React.useEffect(() => {
    useProductsStore.setState({ groups: groups });
    useProductsStore.setState({ rootGroup: rootGroup });
    if (!searchText) {
      if (!activeGroup) {
        useProductsStore.setState({ activeGroup: rootGroup });
      }
    }
  }, [groups, rootGroup, searchText, activeGroup]);

  return (
    <div
      className={css.root_point}
      onClick={() => useProductsStore.setState({ activeGroup: rootGroup })}
    >
      <ListOrdered size={28} color={'#daa520'} />
      {translations[lang].root_point}
    </div>
  );
};
