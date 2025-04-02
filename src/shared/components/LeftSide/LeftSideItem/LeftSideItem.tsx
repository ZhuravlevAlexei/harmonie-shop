'use client';
import React from 'react';
import { ChevronRight } from 'lucide-react';

import { useChildrenGroups } from '@/shared/hooks/useChildrenGroups';
import { useProductNameMultilang } from '@/shared/hooks/useProductNameMultilang';
import { useProductsStore } from '@/shared/store/products';

import { DynamicIcon } from '../DynamicIcon/DynamicIcon';
import { MenuItem } from '../MenuItem/MenuItem';

import { SafeGroup } from '@/shared/types/types';

import css from './LeftSideItem.module.css';
import { usePaginationStore } from '@/shared/store/pagination';

interface LestSideItemProps {
  group: SafeGroup;
}

export const LeftSideItem: React.FC<LestSideItemProps> = ({ group }) => {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const { hasChidrenGroups, chlidrenGroupsList } = useChildrenGroups(group.id);
  const groupName = useProductNameMultilang(group).toUpperCase();

  const handleMenuClick = () => {
    useProductsStore.setState({
      activeGroup: group,
      searchText: '',
    });
    usePaginationStore.setState({ page: 1 });
  };

  return (
    <div
      className={css.left_side_item}
      onMouseEnter={() => setMenuIsOpen(true)}
      onMouseLeave={() => setMenuIsOpen(false)}
      onClick={handleMenuClick}
    >
      <div className={css.left_side_item__content}>
        <DynamicIcon
          className={css.left_side_item__avatar}
          color={'#daa520'}
          id={Number(group.id)}
        />
        <span className={css.left_side_item__name}>{groupName}</span>
      </div>
      {hasChidrenGroups && (
        <>
          <ChevronRight className={css.left_side_item__icon} />
          <div className={css.menu_thumbnail}>
            {menuIsOpen &&
              chlidrenGroupsList.map(group => (
                <MenuItem key={group.id} group={group} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};
