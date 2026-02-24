import axios, { type AxiosRequestConfig } from 'axios';
import type { ResultData } from '@/api/types';

export const pythonService = axios.create();

export const pythonHttp = {
  async get<T = unknown>(url: string, params?: object, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    const response = await pythonService.get<ResultData<T>>(url, { params, ...config });
    return response.data;
  },

  async post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    const response = await pythonService.post<ResultData<T>>(url, data, config);
    return response.data;
  },

  async put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    const response = await pythonService.put<ResultData<T>>(url, data, config);
    return response.data;
  },

  async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    const response = await pythonService.delete<ResultData<T>>(url, config);
    return response.data;
  },
};
