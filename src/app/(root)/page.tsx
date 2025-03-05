import Image from 'next/image';
import css from './page.module.css';

export default function Home() {
  return (
    <div className={css.page}>
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
  );
}
