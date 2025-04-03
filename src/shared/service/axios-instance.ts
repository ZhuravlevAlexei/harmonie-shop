import axios from 'axios';
import { env } from '../utils/env';

export const axiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL, //an example
  baseURL: env('NEXT_PUBLIC_API_URL'),
});
