import React from 'react';
import { Search } from 'lucide-react';
import { useLang } from '@/shared/hooks/useLang';
import css from './SearchInput.module.css';

export const SearchInput: React.FC = () => {
  const { lang, translations } = useLang();
  return (
    <>
      <div className={css.search}>
        <Search className={css.searchIcon} color={'#989898'} />
        <input
          className={css.searchInput}
          type="text"
          placeholder={translations[lang].header.search}
          // onFocus={() => setFocused(true)}
          // value={searchQuery}
          // onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
    </>
  );
};
