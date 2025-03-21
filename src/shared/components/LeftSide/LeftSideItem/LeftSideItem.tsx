import { GroupType } from '@/db/models/group';
import React from 'react';
import css from './LeftSideItem.module.css';
import { ChevronRight } from 'lucide-react';
import { getLanguage } from '@/utils/getLanguage';
import { AllowedLangs } from '@/shared/constants/common';

interface LestSideItemProps {
  group: GroupType;
}

export const LeftSideItem: React.FC<LestSideItemProps> = async ({ group }) => {
  const lang = await getLanguage();
  
  let groupName = '';
  if (lang === AllowedLangs.RU) {
    groupName = group.name_multilang?.ru || '';
  } else {
    groupName = group.name_multilang?.uk || '';
  }

  if (!groupName) {
    groupName = group.name_multilang?.ru || '';
  }

  return (
    <div className={css.left_side_item}>
      <span className={css.left_side_item__name}>{groupName}</span>
      <ChevronRight className={css.left_side_item__icon} />
    </div>
  );
};
