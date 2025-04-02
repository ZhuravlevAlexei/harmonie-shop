import { getGroups } from '@/actions/groups';

import { Breadcrumbs, RootPoint } from '@/shared/components';
import { LeftSide } from '@/shared/components/LeftSide';
import { GoodsContainer } from '@/shared/components/GoodsContainer';

import { GroupType } from '@/db/models/group';

import { createSafeGroups } from '@/shared/utils/createSafeGroups';

import css from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Harmonie Main Page',
  description: 'Harmonie Shop Main Page',
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
