'use server';

import connectDB from '@/db/connectDB';

import { SORT_ORDER } from '@/shared/constants/common';
import { HiddenGroups } from '@/shared/constants/hidden';

import { calculatePaginationData } from '@/shared/utils/calculatePaginationData';
import { createSafeProducts } from '@/shared/utils/createSafeProducts';

import { ProductsCollection, ProductType } from '@/db/models/product';
import { PaginationResult } from '@/shared/types/types';

export async function getProductsForCart(
  itemsIds: number[]
): Promise<ProductType[]> {
  try {
    await connectDB();
    const product = await ProductsCollection.find({ id: { $in: itemsIds } });
    return product;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getProductByPromId(id: number): Promise<ProductType> {
  try {
    await connectDB();
    const product = await ProductsCollection.findOne({ id: id });
    return product;
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
        totalPages: 0,
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
      .equals('on_display')
      .where('presence')
      .equals('available');

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
      .equals('on_display')
      .where('presence')
      .equals('available');

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
