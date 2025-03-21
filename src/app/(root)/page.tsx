import Image from 'next/image';
import css from './page.module.css';
import { getGroups } from '@/actions/groups';
import { RootPoint } from '@/shared/components';
import { LeftSide } from '@/shared/components/LeftSide';
import { GroupType } from '@/db/models/group';

export default async function Home() {
  const groups = await getGroups();
  // console.log('groups: ', groups);
  const rootGroup = groups.find(group => group.parent_group_id === null);

  let firstLvlGroups: GroupType[] = [];

  if (rootGroup) {
    firstLvlGroups = groups.filter(group => group.parent_group_id === 10859524);
    firstLvlGroups = firstLvlGroups.sort((a, b) =>
      (a.name ?? '').localeCompare(b.name ?? '')
    );

    // console.log('firstLvlGroups: ', firstLvlGroups);
  }

  return (
    <div className={css.grid_container}>
      <RootPoint />
      <div className={css.breadcrumbs}>breadcrumbs</div>
      <LeftSide groups={firstLvlGroups} />

      <div className={css.goods_container}>
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
  );
}
