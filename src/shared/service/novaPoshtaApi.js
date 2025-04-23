'use client';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `https://api.novaposhta.ua/v2.0/json/`,
});

// const API_KEY = import.meta.env.VITE_NOVAPOSHTA_API_KEY; //оригинал только для vite сборки!
const API_KEY = process.env.NOVAPOSHTA_API_KEY; //функция env тут не работает - промисы

const params = {
  apiKey: API_KEY,
  modelName: 'Address',
  calledMethod: '',
  methodProperties: {
    Page: '1',
    Limit: '50',
    Warehouse: '1',
    FindByString: '',
    SettlementRef: '',
  },
};

// не понял пока логику почему тут выбор
// в зависимости от варианта доставки видимо пока не учитывается вариант поиска адреса
//оргинал
// export async function fetchNPSettlementsByQuery(query, deliveryType) {
// params.calledMethod =
//   deliveryType === 'Доставка до відділення' ? 'getSettlements' : 'getCities';
//конец оригинала
//  фиксирую пока вариант по отделениям
export async function fetchNPSettlementsByQuery(query) {
  params.calledMethod = 'getSettlements';
  // params.calledMethod = 'getWarehouses';

  // ниже только для тестирования
  // const calledMethod =
  // deliveryType === 'Доставка до відділення' ? 'getSettlements' : 'getCities';
  // console.log('deliveryType: ', deliveryType);
  // console.log('calledMethod: ', calledMethod);
  // конец тестирования

  params.methodProperties.FindByString = query;
  params.methodProperties.SettlementRef = '';
  const { data } = await axiosInstance.post('', params);
  return data.data;
}

export async function fetchNPDivisionsBySettlementId(id) {
  params.calledMethod = 'getWarehouses';
  params.methodProperties.FindByString = '';
  params.methodProperties.SettlementRef = id;
  const { data } = await axiosInstance.post('', params);
  return data.data;
}

export async function fetchNPDivisionsByQuery(query, id) {
  params.calledMethod = 'getWarehouses';
  params.methodProperties.FindByString = query;
  params.methodProperties.SettlementRef = id;
  const { data } = await axiosInstance.post('', params);
  return data.data;
}
