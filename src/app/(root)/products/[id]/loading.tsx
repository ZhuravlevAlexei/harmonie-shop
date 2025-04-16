import { Loader } from 'lucide-react';

import css from '@/app/globalStyles/loading.module.css';

export default function Loading() {
  return (
    <div className={css.root_page}>
      <Loader size={68} className="animate-spin" />
    </div>
  );
}
