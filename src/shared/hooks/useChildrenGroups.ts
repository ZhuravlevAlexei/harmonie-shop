'use client';
import { useProductsStore } from '@/shared/store/products';
import { SafeGroup } from '@/shared/types/types';

interface ChildrenGroups {
  hasChidrenGroups: boolean;
  chlidrenGroupsList: SafeGroup[];
}

export const useChildrenGroups = (parentGroupId: number): ChildrenGroups => {
  const stateGroups = useProductsStore(state => state.groups);

  const childrenGroups = stateGroups.filter(
    item => item.parent_group_id === parentGroupId
  );

  if (childrenGroups.length > 0) {
    return { hasChidrenGroups: true, chlidrenGroupsList: childrenGroups };
  } else {
    return { hasChidrenGroups: false, chlidrenGroupsList: [] };
  }
};
