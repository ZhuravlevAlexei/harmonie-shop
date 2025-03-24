'use client';

import React from 'react';
import { House } from 'lucide-react';
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
  React.useEffect(() => {
    useProductsStore.setState({ groups: groups });
    useProductsStore.setState({ rootGroup: rootGroup });
    useProductsStore.setState({ activeGroup: rootGroup });
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
