'use client';
import React from 'react';
import clsx from 'clsx';

import { FaTelegramPlane } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa6'; // Font Awesome
import { SiViber } from 'react-icons/si';
import { MdOutlineEmail } from 'react-icons/md'; // Simple Icons

import css from './Contacts.module.css';
import { useLang } from '@/shared/hooks/useLang';

export const Contacts: React.FC = () => {
  const { lang, translations } = useLang();
  return (
    <div className={css.contacts__wrapper}>
      <div className={css.schedule}>
        <h4>{translations[lang].contacts.schedule}</h4>
        <div className={css.shedule__item}>
          <span>{translations[lang].contacts.monday}</span>
          <span>9:00 - 18:00</span>
        </div>
        <div className={css.shedule__item}>
          <span>{translations[lang].contacts.tuesday}</span>
          <span>9:00 - 18:00</span>
        </div>
        <div className={css.shedule__item}>
          <span>{translations[lang].contacts.wednesday}</span>
          <span>9:00 - 18:00</span>
        </div>
        <div className={css.shedule__item}>
          <span>{translations[lang].contacts.thursday}</span>
          <span>9:00 - 18:00</span>
        </div>
        <div className={css.shedule__item}>
          <span>{translations[lang].contacts.friday}</span>
          <span>9:00 - 18:00</span>
        </div>
        <div className={css.shedule__item}>
          <span>{translations[lang].contacts.saturday}</span>
          <span>10:00 - 15:00</span>
        </div>
        <div className={css.shedule__item}>
          <span>{translations[lang].contacts.sunday}</span>
          <span>{translations[lang].contacts.weekend}</span>
        </div>
      </div>
      <div className={css.information}>
        <h3>{translations[lang].contacts.title}</h3>
        <div className={css.information__item}>
          <span className={css.information__item__name}>
            {translations[lang].company.name}
          </span>
          <span className={css.information__item__data}>
            {translations[lang].company.name_data}
          </span>
        </div>
        <div className={css.information__item}>
          <span className={css.information__item__name}>
            {translations[lang].company.manager}
          </span>
          <span className={css.information__item__data}>
            {translations[lang].company.manager_data}
          </span>
        </div>
        <div className={css.information__item}>
          <span className={css.information__item__name}>
            {translations[lang].company.location}
          </span>
          <span className={css.information__item__data}>
            {translations[lang].company.location_data}
          </span>
        </div>
        <div className={css.information__item}>
          <span className={css.information__item__name}>
            <FaPhone size={20} />
            {translations[lang].company.phones}
          </span>
          <span className={css.information__item__data}>
            {translations[lang].company.phones_data}
          </span>
        </div>
        <div className={css.information__item}>
          <span className={css.information__item__name}>
            <MdOutlineEmail size={20} />
            {translations[lang].company.email}
          </span>
          <span className={css.information__item__data}>
            <a href={`mailto:${translations[lang].company.email_data}`}>
              {translations[lang].company.email_data}
            </a>
          </span>
        </div>
        <div className={css.information__item}>
          <span className={css.information__item__name}>
            <FaTelegramPlane size={20} />
            {translations[lang].company.telegram}
          </span>
          <span className={css.information__item__data}>
            <a href="https://t.me/ilona_zhouravleva">
              {translations[lang].company.telegram_data}
            </a>
          </span>
        </div>
        <div className={css.information__item}>
          <span className={css.information__item__name}>
            <SiViber size={20} />
            {translations[lang].company.viber}
          </span>
          <span className={css.information__item__data}>
            <a
              href={`viber://chat?number=${translations[lang].company.viber_data}`}
            >
              {translations[lang].company.viber_data}
            </a>
          </span>
        </div>
        <div className={css.information__item}>
          <span className={css.information__item__name}>
            {translations[lang].company.documents}
          </span>
          <span className={clsx(css.information__item__data, css.documents)}>
            <a href="/docs/vipiska_01.jpg">
              Виписка з Єдиного державного реєстру юридичних осіб (1 стор.)
            </a>
            <a href="/docs/vipiska_02.jpg">
              Виписка з Єдиного державного реєстру юридичних осіб (2 стор.)
            </a>
            <a href="/docs/vitiag.jpg">
              Витяг з реєстру платників єдиного податку
            </a>
          </span>
        </div>
        <button className={css.admin}>Admin area</button>
      </div>
    </div>
  );
};
