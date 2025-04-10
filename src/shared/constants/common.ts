import {
  BookOpen,
  Baby,
  Cat,
  Volleyball,
  LibraryBig,
  Disc2,
  Shirt,
  Gift,
  Amphora,
  Barcode,
} from 'lucide-react';

export enum ApiRouts {
  PRODUCTS = '/products',
  PRODUCTS_DATA = '/products/data',
}

export enum PaginationLimits {
  LIMIT_12 = 12,
  LIMIT_24 = 24,
  LIMIT_36 = 36,
}

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export enum AllowedLangs {
  UK = 'uk',
  RU = 'ru',
}

export const groupsOrderTemplate = [
  { order: 100, icon: BookOpen, id: 12045092, name: 'КНИГИ' },
  { order: 110, icon: Baby, id: 20384333, name: 'ТОВАРИ ДЛЯ ДІТЕЙ' },
  { order: 120, icon: Cat, id: 11010531, name: 'ЗООТОВАРИ' },
  {
    order: 130,
    icon: Volleyball,
    id: 12022295,
    name: 'СПОРТ, ВІДПОЧИНОК, ТУРИЗМ',
  },
  { order: 140, icon: LibraryBig, id: 50118188, name: 'БУКІНІСТИКА' },
  { order: 150, icon: Disc2, id: 63733825, name: 'ПЛАСТИНКИ' },
  { order: 160, icon: Shirt, id: 97202457, name: 'ОДЯГ, ВЗУТТЯ' },
  { order: 170, icon: Gift, id: 109627187, name: 'СУВЕНІРИ, ПОДАРУНКИ' },
  {
    order: 180,
    icon: Amphora,
    id: 118331618,
    name: 'ПОСУД, СЕРВІЗИ, СУВЕНІРИ, ДЕКОР',
  },
  {
    order: 190,
    icon: Barcode,
    id: 118945548,
    name: 'ПАКУВАННЯ.ЕТИКЕТКИ ТА БІРКИ',
  },
];
