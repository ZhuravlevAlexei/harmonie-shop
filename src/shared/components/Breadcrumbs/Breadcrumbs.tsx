'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, House } from 'lucide-react';

import { useProductsStore } from '@/shared/store/products';
import { usePaginationStore } from '@/shared/store/pagination';
import { useLang } from '@/shared/hooks/useLang';
import { getNameMultilang } from '@/shared/utils/getNameMultilang';

import { SafeGroup, SafeProduct } from '@/shared/types/types';

import css from './Breadcrumbs.module.css';

interface BreadcrumbsProps {
  safeProduct?: SafeProduct | null;
  safeGroups?: SafeGroup[] | null;
  safeRootGroup?: SafeGroup | null;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  safeProduct = null,
  safeGroups = null,
  safeRootGroup = null,
}) => {
  const router = useRouter();
  let rootGroup = useProductsStore(state => state.rootGroup);
  let activeGroup = useProductsStore(state => state.activeGroup);
  let activeProduct = useProductsStore(state => state.activeProduct);
  const searchText = useProductsStore(state => state.searchText);
  const groups = useProductsStore(state => state.groups);
  const { lang } = useLang();

  if (searchText) {
    activeGroup =
      groups.find(group => group.id === activeProduct?.groupId) || null;
  }

  if (safeProduct) {
    rootGroup = safeRootGroup;
    activeProduct = safeProduct;
    if (safeGroups) {
      activeGroup =
        safeGroups.find(group => group.id === safeProduct.groupId) || null;
    }
    setTimeout(() => {
      useProductsStore.setState({
        rootGroup: rootGroup,
        activeGroup: activeGroup,
        searchText: '',
        groups: safeGroups || [],
      });
    }, 100);
  }

  if (!rootGroup) return <div></div>;
  if (!activeGroup) return <div></div>;
  if (Number(activeGroup.id) === Number(rootGroup.id)) return <div></div>;

  let currentGroup: SafeGroup | undefined;
  const chainArray: SafeGroup[] = [];
  chainArray.push(activeGroup);
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
      chainArray.unshift(currentGroup);
    }
  }
  if (Number(activeGroup.id) !== Number(rootGroup.id)) {
    chainArray.unshift(rootGroup);
  }

  const handleBreadcrumbsClick = (group: SafeGroup) => {
    useProductsStore.setState({
      activeProduct: null,
      searchText: '',
    });
    if (group.id !== activeGroup.id) {
      useProductsStore.setState({
        activeGroup: group,
      });
      usePaginationStore.setState({
        page: 1,
        totalPages: 0,
      });
    }
    router.push(`/`);
  };

  return (
    <div className={css.breadcrumbs}>
      {chainArray &&
        chainArray.map(group => (
          <div
            className={css.breadcrumbs__item}
            key={group.id}
            onClick={() => handleBreadcrumbsClick(group)}
          >
            {group.id === rootGroup.id && <House size={26} color={'#daa520'} />}
            {group.id !== rootGroup.id && (
              <>
                <ChevronRight className={css.breadcrumbs__icon} />
                <span className={css.breadcrumbs__name}>
                  {getNameMultilang(group, lang)}
                </span>
              </>
            )}
          </div>
        ))}
      {activeProduct && (
        <>
          <ChevronRight className={css.breadcrumbs__icon} />
          <span className={css.breadcrumbs__product}>
            {getNameMultilang(activeProduct, lang)}
          </span>
        </>
      )}
    </div>
  );
};
