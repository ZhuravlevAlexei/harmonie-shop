import { groupsOrderTemplate } from '@/shared/constants/common';

import { GroupType } from '@/db/models/group';
import { SafeGroup } from '@/shared/types/types';

const chooseImage = (picUrl: string) => {
  if (picUrl.includes('/cloud-cgi/static/')) {
    return '/5c23f889-065f-43dd-a012-0e87b13e47b8.jpg';
  }
  return picUrl;
};

export const createSafeGroups = (groups: GroupType[]) => {
  const root = groups.find(group => group.parent_group_id === null);

  const rootGroup: SafeGroup = {
    id: root?.id || 0,
    name: root?.name || '',
    name_multilang: {
      ru: root?.name_multilang?.ru || '',
      uk: root?.name_multilang?.uk || '',
    },
    description_multilang: {
      ru: root?.description_multilang?.ru || '',
      uk: root?.description_multilang?.uk || '',
    },
    image: chooseImage(String(root?.image)) || '',
    parent_group_id: null,
    order: 999,
  };

  const workGroups: SafeGroup[] = groups.map(group => ({
    id: Number(group.id),
    name: String(group.name),
    name_multilang: {
      ru: group.name_multilang?.ru || '',
      uk: group.name_multilang?.uk || '',
    },
    description_multilang: {
      ru: group.description_multilang?.ru || '',
      uk: group.description_multilang?.uk || '',
    },
    image: chooseImage(String(group?.image)) || '',
    parent_group_id: Number(group.parent_group_id),
    order: 999,
  }));

  let firstLvlGroups: SafeGroup[] = [];
  if (rootGroup) {
    firstLvlGroups = workGroups.filter(
      group => group.parent_group_id === 10859524
    );

    firstLvlGroups = firstLvlGroups
      .map(group => {
        const gr = groupsOrderTemplate.find(g => g.id === group.id);
        let order = 999;
        if (gr) {
          order = gr.order;
        }
        group.order = order;

        return group;
      })
      .sort((a, b) => a.order - b.order);
  }

  return { rootGroup, workGroups, firstLvlGroups };
};
