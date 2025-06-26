'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, House, Loader } from 'lucide-react';

import { useProductsStore } from '@/shared/store/products';
import { usePaginationStore } from '@/shared/store/pagination';
import { useInterfaceStore } from '@/shared/store/interface';
import { useLang } from '@/shared/hooks/useLang';
import { getNameMultilang } from '@/shared/utils/getNameMultilang';

import { SafeGroup, SafeProduct } from '@/shared/types/types';

import css from './Breadcrumbs.module.css';
import { GroupType } from '@/db/models/group';
import { createSafeGroups } from '@/shared/utils/createSafeGroups';

interface BreadcrumbsProps {
  safeProduct?: SafeProduct;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  safeProduct = null,
}) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const isDirectLinkToPage = useInterfaceStore(
    state => state.isDirectLinkToPage
  );
  const rootGroup = useProductsStore(state => state.rootGroup);
  let activeGroup = useProductsStore(state => state.activeGroup);
  let activeProduct = useProductsStore(state => state.activeProduct);
  const searchText = useProductsStore(state => state.searchText);
  const groups = useProductsStore(state => state.groups);
  const { lang } = useLang();

  if (searchText) {
    activeGroup =
      groups.find(group => group.id === activeProduct?.groupId) || null;
  }

  React.useEffect(() => {
    const setGroups = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/groups');
        if (res.ok) {
          const answer = await res.json();
          const currentGroups: GroupType[] = answer.groups;
          if (currentGroups) {
            const { rootGroup, workGroups } = createSafeGroups(currentGroups);
            let currentGroup: SafeGroup | undefined;
            if (safeProduct) {
              currentGroup = workGroups.find(
                group => group.id === safeProduct.groupId
              );
            }
            useProductsStore.setState({
              rootGroup: rootGroup,
              activeGroup: currentGroup,
              groups: workGroups,
            });
          }
        }
      } catch (error) {
        console.log('error: ', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    if (isDirectLinkToPage && safeProduct && groups.length === 0) {
      setGroups();
    }
  }, [isDirectLinkToPage, safeProduct, groups]);

  if (safeProduct) activeProduct = safeProduct;

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
    <>
      {loading ? (
        <div className={css.breadcrumbs}>
          <Loader size={24} className="animate-spin" />
        </div>
      ) : (
        <div className={css.breadcrumbs}>
          {chainArray &&
            chainArray.map(group => (
              <div
                className={css.breadcrumbs__item}
                key={group.id}
                onClick={() => handleBreadcrumbsClick(group)}
              >
                {group.id === rootGroup.id && (
                  <House size={26} color={'#daa520'} />
                )}
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
      )}
    </>
  );
};
