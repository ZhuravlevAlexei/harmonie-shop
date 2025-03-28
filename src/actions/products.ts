'use server';
import connectDB from '@/db/connectDB';
import { ProductsCollection } from '@/db/models/product';

import { SORT_ORDER } from '@/shared/constants/common';
import { calculatePaginationData } from '@/utils/calculatePaginationData';

import { createSafeProducts } from '@/utils/createSafeProducts';
import { GroupType } from '@/db/models/group';
import { PaginationResult } from '@/shared/types/types';
import { HiddenGroups } from '@/shared/constants/hidden';

export async function hasProductsByGroupId(group: GroupType): Promise<boolean> {
  try {
    const groupId = Number(group.id);
    await connectDB();
    const count = await ProductsCollection.find()
      .where('group.id')
      .equals(groupId)
      .where('status')
      .equals('on_display')
      .countDocuments();
    if (count === 0) {
      console.log('count: ', groupId, group.name, count);
    }
    return count === 0 ? false : true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getProductsBySearchText(
  searchText: string,
  page = 1,
  perPage = 12,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name'
): Promise<PaginationResult> {
  if (searchText.trim() === '') {
    return {
      products: [],
      paginationData: {
        page: 1,
        perPage: 12,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
  try {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const sortOrderTS = sortOrder === SORT_ORDER.ASC ? 1 : -1;
    await connectDB();
    const productsQuery = ProductsCollection.find({
      $or: [
        { name: { $regex: searchText, $options: 'i' } }, // Поиск в name
        { 'name_multilang.ru': { $regex: searchText, $options: 'i' } }, // Поиск в name_multilang.ru
        { 'name_multilang.uk': { $regex: searchText, $options: 'i' } }, // Поиск в name_multilang.uk
      ],
      'group.id': { $nin: HiddenGroups },
    })
      .where('status')
      .equals('on_display');

    const [productsCount, products] = await Promise.all([
      ProductsCollection.find().merge(productsQuery).countDocuments(),
      productsQuery
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrderTS })
        .exec(),
    ]);
    const safeProducts = createSafeProducts(products);

    const paginationData = calculatePaginationData(
      productsCount,
      perPage,
      page
    );

    return { products: safeProducts, paginationData };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getProductsByGroupId(
  groupId: number,
  page = 1,
  perPage = 12,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name'
  // filter = {}
): Promise<PaginationResult> {
  try {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const sortOrderTS = sortOrder === SORT_ORDER.ASC ? 1 : -1;
    await connectDB();
    const productsQuery = ProductsCollection.find()
      .where('group.id')
      .equals(groupId)
      .where('status')
      .equals('on_display');

    const [productsCount, products] = await Promise.all([
      ProductsCollection.find().merge(productsQuery).countDocuments(),
      productsQuery
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrderTS })
        .exec(),
    ]);

    const safeProducts = createSafeProducts(products);

    const paginationData = calculatePaginationData(
      productsCount,
      perPage,
      page
    );

    return { products: safeProducts, paginationData };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
