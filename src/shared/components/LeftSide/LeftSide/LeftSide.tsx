import React from 'react';

import { LeftSideItem } from '../LeftSideItem/LeftSideItem';

import { SafeGroup } from '@/shared/types/types';

import css from './LeftSide.module.css';

interface LeftSideProps {
  groups: SafeGroup[];
}

export const LeftSide: React.FC<LeftSideProps> = ({ groups }) => {
  return (
    <div className={css.left_side}>
      {groups.map(group => (
        <LeftSideItem key={group.id} group={group} />
      ))}
    </div>
  );
};
