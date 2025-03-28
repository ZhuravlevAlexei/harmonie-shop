'use client';
import React from 'react';
import { ChevronRight } from 'lucide-react';

import { SafeGroup } from '@/shared/types/types';

import { useChildrenGroups } from '@/shared/hooks/useChildrenGroups';
import { useProductNameMultilang } from '@/shared/hooks/useProductNameMultilang';
import { useProductsStore } from '@/shared/store/products';

import css from './MenuItem.module.css';

interface MenuItemProps {
  group: SafeGroup;
}

export const MenuItem: React.FC<MenuItemProps> = ({ group }) => {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const { hasChidrenGroups, chlidrenGroupsList } = useChildrenGroups(group.id);
  const groupName = useProductNameMultilang(group);

  const handleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    useProductsStore.setState({
      activeGroup: group,
      searchText: '',
    });
  };

  return (
    <div
      className={css.menu_item}
      onMouseEnter={() => setMenuIsOpen(true)}
      onMouseLeave={() => setMenuIsOpen(false)}
      onClick={handleMenuClick}
    >
      {groupName}
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
