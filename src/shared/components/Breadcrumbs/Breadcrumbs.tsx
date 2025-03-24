'use client';
import React from 'react';

import { useProductsStore } from '@/shared/store/products';
import { useLang } from '@/shared/hooks/useLang';

import { SafeGroup } from '@/shared/types/types';

import css from './Breadcrumbs.module.css';
import { getNameMultilang } from '@/utils/getNameMulang';

export const Breadcrumbs: React.FC = () => {
  const activeGroup = useProductsStore(state => state.activeGroup);
  const rootGroup = useProductsStore(state => state.rootGroup);
  const groups = useProductsStore(state => state.groups);
  const { lang } = useLang();

  if (!rootGroup) return <div></div>;
  if (!activeGroup) return <div></div>;
  if (Number(activeGroup.id) === Number(rootGroup.id)) return <div></div>;

  let currentGroup: SafeGroup | undefined;

  const chainArr: SafeGroup[] = [];
  chainArr.push(activeGroup);
  let currentId: number = Number(activeGroup.parent_group_id);
  let lvl = 0;
  while (currentId !== Number(rootGroup.id) || lvl < 10) {
    lvl++;
    currentGroup = groups.find(group => group.id === currentId);
    if (!currentGroup) {
      break;
    }
    currentId = Number(currentGroup.parent_group_id);
    if (Number(currentGroup.id) !== Number(rootGroup.id)) {
      chainArr.unshift(currentGroup);
    }
  }

  return (
    <div className={css.breadcrumbs}>
      {chainArr &&
        chainArr.map(group => (
          <div
            key={group.id}
            onClick={() => useProductsStore.setState({ activeGroup: group })}
          >
            {`/ `}
            <span className={css.breadcrumbs__name}>
              {getNameMultilang(group, lang)}
            </span>
          </div>
        ))}
    </div>
  );
};
