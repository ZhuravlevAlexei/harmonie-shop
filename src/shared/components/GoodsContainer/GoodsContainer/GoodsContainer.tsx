'use client';
import React from 'react';
import Image from 'next/image';
import { GroupsView } from '../GroupsView/GroupsView';

import { useProductsStore } from '@/shared/store/products';

import { SafeGroup } from '@/shared/types/types';

import css from './GoodsContainer.module.css';
import { ProductsView } from '../ProductsView/ProductsView';

export const GoodsContainer: React.FC = () => {
  const activeGroup = useProductsStore(state => state.activeGroup);
  const searchText = useProductsStore(state => state.searchText);
  if (!activeGroup) return <div />;
  return (
    <div>
      <div className={css.goods_container}>
        {!searchText && <GroupsView activeGroup={activeGroup as SafeGroup} />}
        <ProductsView activeGroupId={Number(activeGroup.id)} />
        <div>
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
    </div>
  );
};
