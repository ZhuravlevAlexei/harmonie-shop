'use server';
import connectDB from '@/db/connectDB';

import { SORT_ORDER } from '@/shared/constants/common';
import { HiddenGroups } from '@/shared/constants/hidden';

import { calculatePaginationData } from '@/shared/utils/calculatePaginationData';
import { createSafeProducts } from '@/shared/utils/createSafeProducts';

import { ProductsCollection, ProductType } from '@/db/models/product';
import { PaginationResult } from '@/shared/types/types';

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

// export async function getEmptyGroupsIds(): Promise<number[]> {
//   try {
//     await connectDB();
//     const groupsWithOnDisplayProducts = await ProductsCollection.aggregate([
//       {
//         $match: { status: 'on_display' }, // Фильтруем только товары со статусом 'on_display'
//       },
//       {
//         $group: {
//           _id: '$group.id', // Группируем по group.id (собираем уникальные значения)
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           groupId: '$_id', // Переименовываем поле _id -> groupId для удобства
//         },
//       },
//     ]);

//     // console.log(groupsWithOnDisplayProducts);
//     const groupIdsArray = groupsWithOnDisplayProducts.map(item => item.groupId);

//     return groupIdsArray;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// export async function hasProductsByGroupId(group: GroupType): Promise<boolean> {
//   try {
//     const groupId = Number(group.id);
//     await connectDB();
//     const count = await ProductsCollection.find()
//       .where('group.id')
//       .equals(groupId)
//       .where('status')
//       .equals('on_display')
//       .countDocuments();
//     // if (count === 0) {
//     //   console.log('count: ', groupId, group.name, count);
//     // }
//     return count === 0 ? false : true;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
