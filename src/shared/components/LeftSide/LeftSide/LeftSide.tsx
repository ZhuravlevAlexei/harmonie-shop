import { GroupType } from '@/db/models/group';
import React from 'react';
import css from './LeftSide.module.css';
import { LeftSideItem } from '../LeftSideItem/LeftSideItem';

interface LeftSideProps {
  groups: GroupType[];
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
