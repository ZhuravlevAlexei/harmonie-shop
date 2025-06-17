'use client';

import React from 'react';
import qs from 'qs';
import clsx from 'clsx';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/navigation';

import { Button } from '../../common/Button/Button';
import { ORDER_STATUS, OrderStatusLabels } from '@/shared/constants/common';

import 'react-datepicker/dist/react-datepicker.css'; // data picker default styles
import './custom-datepicker.css'; // data picker custom styles
import css from './Filters.module.css';

interface FiltersProps {
  className?: string;
}

const getEndDate = () => {
  const date = new Date();
  return date;
};

const getStartDate = () => {
  const date = getEndDate();
  date.setDate(date.getDate() - 14);
  return date;
};

export const Filters: React.FC<FiltersProps> = ({}) => {
  const [useFilters, setUseFilters] = React.useState(false);
  const [filterStatus, setFilterStatus] = React.useState('all');
  const [endDate, setEndDate] = React.useState(getEndDate());
  const [startDate, setStartDate] = React.useState(getStartDate());
  const router = useRouter();

  React.useEffect(() => {
    try {
      const storedUseFilters = localStorage.getItem('harmonie_useFilters');
      const storedfilterStatus = localStorage.getItem('harmonie_filterStatus');
      const storedStartDate = localStorage.getItem('harmonie_startDate');
      if (storedUseFilters) {
        setUseFilters(JSON.parse(storedUseFilters));
      }
      if (storedfilterStatus) {
        setFilterStatus(JSON.parse(storedfilterStatus));
      }
      if (storedStartDate) {
        setStartDate(new Date(JSON.parse(storedStartDate)));
      }
    } catch (e) {
      console.error(e);
    }
  }, [useFilters]);

  const handleApplyFilters = () => {
    const query = qs.stringify(
      {
        status: filterStatus,
        startDate: startDate,
        endDate: endDate,
      },
      { arrayFormat: 'comma' }
    );
    router.push(`?${query}`, { scroll: false });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = e.target.value as ORDER_STATUS;
    setFilterStatus(selectedStatus);
    try {
      localStorage.setItem(
        'harmonie_filterStatus',
        JSON.stringify(selectedStatus)
      );
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const handleUseFiltersChange = () => {
    if (useFilters) {
      router.push('/orders');
    }
    setUseFilters(!useFilters);
    try {
      localStorage.setItem('harmonie_useFilters', JSON.stringify(!useFilters));
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <div className={css.filters__wrapper}>
      <input
        type="checkbox"
        id="useFilters"
        onChange={() => {
          handleUseFiltersChange();
        }}
        checked={useFilters}
      />
      <label htmlFor="useFilters">Фильтры</label>
      <div className={clsx(css.filters__area, !useFilters && css.hidden)}>
        <label htmlFor="filterStatus" className={css.filter__status__label}>
          Статус:
        </label>
        <select
          className={css.filter__status__select}
          id="filterStatus"
          value={filterStatus}
          onChange={e => handleSelectChange(e)}
        >
          <option value={'all'}>Все</option>
          <option value={ORDER_STATUS.NEW}>{OrderStatusLabels.new}</option>
          <option value={ORDER_STATUS.ACCEPTED}>
            {OrderStatusLabels.accepted}
          </option>
          <option value={ORDER_STATUS.COMPLETED}>
            {OrderStatusLabels.completed}
          </option>
          <option value={ORDER_STATUS.CANCELED}>
            {OrderStatusLabels.canceled}
          </option>
        </select>
        <span className={css.filters__title}>Период с:</span>
        <DatePicker
          showIcon
          selected={startDate}
          onChange={(date: Date | null) => {
            if (date !== null) {
              setStartDate(date);
              try {
                localStorage.setItem(
                  'harmonie_startDate',
                  JSON.stringify(date)
                );
              } catch (error) {
                console.log('error: ', error);
              }
            }
          }}
          dateFormat="dd.MM.yyyy"
        />
        <span className={css.filters__title}>по:</span>
        <DatePicker
          showIcon
          selected={endDate}
          onChange={(date: Date | null) => {
            if (date !== null) setEndDate(date);
          }}
          dateFormat="dd.MM.yyyy"
        />
        <Button className={css.filters__button} onClick={handleApplyFilters}>
          Применить
        </Button>
      </div>
    </div>
  );
};
