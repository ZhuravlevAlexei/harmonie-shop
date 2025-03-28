'use client';
import React from 'react';
import { Search } from 'lucide-react';

import { useLang } from '@/shared/hooks/useLang';
import { useProductsStore } from '@/shared/store/products';

import css from './SearchInput.module.css';

export const SearchInput: React.FC = () => {
  const rootGroup = useProductsStore(state => state.rootGroup);
  const searchText = useProductsStore(state => state.searchText);
  const [localQuery, setLocalQuery] = React.useState(searchText);
  const { lang, translations } = useLang();

  React.useEffect(() => setLocalQuery(searchText), [searchText]);

  const handleReset = () => {
    useProductsStore.setState({ searchText: '' });
    useProductsStore.setState({ activeGroup: rootGroup });
    useProductsStore.setState({ products: [] });

    setLocalQuery('');
  };

  const handleSearch = (query: string) => {
    if (!query) return;
    setLocalQuery(query);
    useProductsStore.setState({ searchText: query });
    useProductsStore.setState({ activeGroup: rootGroup });
  };

  return (
    <>
      <div className={css.search}>
        <Search className={css.searchIcon} color={'#989898'} />
        <input
          className={css.searchInput}
          type="text"
          placeholder={translations[lang].header.search}
          value={localQuery}
          onKeyDown={e => e.key === 'Enter' && handleSearch(localQuery)}
          onChange={e => setLocalQuery(e.target.value)}
        />
        <button className={css.resetTextButton} onClick={handleReset}>
          X
        </button>
        <button
          className={css.searchButton}
          onClick={() => handleSearch(localQuery)}
        >
          {translations[lang].header.searchButton}
        </button>
      </div>
    </>
  );
};
