'use client';
import React from 'react';
import Image from 'next/image';

import { useLangStore } from '@/shared/store/lang';
import { useProductsStore } from '@/shared/store/products';
import { getNameMultilang } from '@/shared/utils/getNameMultilang';

import { SafeGroup } from '@/shared/types/types';

import css from './GroupsView.module.css';

interface GroupsViewProps {
  activeGroup: SafeGroup;
}

export const GroupsView: React.FC<GroupsViewProps> = ({ activeGroup }) => {
  const lang = useLangStore(state => state.lang);
  const rootGroup = useProductsStore(state => state.rootGroup);
  const groups = useProductsStore(state => state.groups);

  const localGroups = groups.filter(
    group => group.parent_group_id === activeGroup?.id
  );
  if (activeGroup?.id === rootGroup?.id) {
    localGroups.sort((a, b) => a.order - b.order);
  } else {
    localGroups.sort((a, b) => a.name.localeCompare(b.name));
  }
  return (
    <div className={css.groups_list}>
      {localGroups.length > 0 &&
        localGroups.map(group => (
          <div
            key={group.id}
            className={css.group_item}
            onClick={() => useProductsStore.setState({ activeGroup: group })}
          >
            <Image
              className={css.product_item__image}
              src={group.image as string}
              alt="Product image"
              width={150}
              height={140}
              priority
            />
            <div className={css.group_item__text}>
              {getNameMultilang(group, lang)}
            </div>
          </div>
        ))}
    </div>
  );
};
