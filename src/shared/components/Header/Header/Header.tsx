'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaTelegramPlane } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa6';
import { SiViber } from 'react-icons/si';
import { Search, SearchX } from 'lucide-react';

import {
  CartButton,
  LaguageSelect,
  Navigation,
  // ProfileButton,
  SearchInput,
} from '..';

import { useProductsStore } from '@/shared/store/products';
import { useInterfaceStore } from '@/shared/store/interface';
import { useLang } from '@/shared/hooks/useLang';

import css from './Header.module.css';

export const Header: React.FC = () => {
  const { lang, translations } = useLang();
  const isSearchOpen = useInterfaceStore(state => state.isSearchOpen);
  const handleRootClick = () => {
    useProductsStore.setState({
      activeGroup: null,
      activeProduct: null,
      searchText: '',
    });
  };

  return (
    <header className={css.header}>
      <Link
        href="/"
        className={css.header__logo__link}
        onClick={handleRootClick}
      >
        <Image src="/logo.png" width={32} height={32} alt="Logo" />
        <div className={css.header__logo__text}>Harmonie</div>
      </Link>
      <div className={css.header__contacts}>
        <span className={css.header__contacts__messenger}>
          <a
            className={css.header__contacts__link}
            href={`tel:${translations[lang].company.master_phone}`}
          >
            <FaPhone size={16} />
            {translations[lang].company.master_phone}
          </a>
        </span>
        <span className={css.header__contacts__messenger}>
          <a
            title={translations[lang].company.telegram_data}
            href="https://t.me/ilona_zhouravleva"
          >
            <FaTelegramPlane size={20} />
          </a>
        </span>
        <span className={css.header__contacts__messenger}>
          <a
            title={translations[lang].company.viber_data}
            href={`viber://chat?number=${translations[lang].company.viber_data}`}
          >
            <SiViber size={20} />
          </a>
        </span>
      </div>
      <SearchInput />
      <div className={css.header__buttons}>
        <LaguageSelect />
        <Navigation />
        {/* <ProfileButton /> */}
        <CartButton />
        <div
          className={css.header__mobile__search}
          onClick={() =>
            useInterfaceStore.setState({ isSearchOpen: !isSearchOpen })
          }
        >
          {isSearchOpen ? <SearchX size={32} /> : <Search size={32} />}
        </div>
      </div>
    </header>
  );
};
