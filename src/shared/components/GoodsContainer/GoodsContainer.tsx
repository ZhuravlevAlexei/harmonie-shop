'use client';
import React from 'react';
import Image from 'next/image';

import css from './GoodsContainer.module.css';
import { useProductsStore } from '@/shared/store/products';
import { useLangStore } from '@/shared/store/lang';
import { getNameMultilang } from '@/utils/getNameMulang';

interface GoodsContainerProps {
  className?: string;
}

export const GoodsContainer: React.FC<GoodsContainerProps> = ({
  className,
}) => {
  const lang = useLangStore(state => state.lang);
  const rootGroup = useProductsStore(state => state.rootGroup);
  const activeGroup = useProductsStore(state => state.activeGroup);
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
    <div className={className}>
      <div className={css.groups_list}>
        {localGroups.length > 0 &&
          localGroups.map(group => (
            <div
              key={group.id}
              className={css.group_item}
              onClick={() => useProductsStore.setState({ activeGroup: group })}
            >
              <img
                src={group.image}
                alt="Group image"
                width={250}
                height={220}
              />
              <div className={css.group_item__text}>
                {getNameMultilang(group, lang)}
              </div>
            </div>
          ))}
      </div>

      <div className={css.goods_container}>
        <h1 className={css.title}>H a r m o n i e</h1>
        <Image
          className={css.logo}
          src="/web-app-manifest-192x192.png"
          alt="Next.js logo"
          width={180}
          height={180}
          priority
        />
      </div>
    </div>
  );
};
