import { Metadata } from 'next';

import { getGroups } from '@/actions/groups';

import { Breadcrumbs, RootPoint } from '@/shared/components';
import { LeftSide } from '@/shared/components/LeftSide';
import { GoodsContainer } from '@/shared/components/GoodsContainer';

import { GroupType } from '@/db/models/group';

import { createSafeGroups } from '@/shared/utils/createSafeGroups';

import css from './page.module.css';

export const metadata: Metadata = {
  title: 'Інтернет-магазин',
  description:
    'Найкращі книги, іграшки, товари для спорту та туризму, товари для тварин...',
};

export default async function Home() {
  const groups = (await getGroups()) as GroupType[];
  const { rootGroup, workGroups, firstLvlGroups } = createSafeGroups(groups);

  return (
    <div className={css.grid_container}>
      <RootPoint rootGroup={rootGroup} groups={workGroups} />
      <Breadcrumbs />
      <LeftSide groups={firstLvlGroups} />
      <GoodsContainer />
    </div>
  );
}
