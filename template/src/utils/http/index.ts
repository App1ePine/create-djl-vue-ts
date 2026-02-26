import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import type { ResultData } from '@/utils/http/types';

const ResultEnumPython = {
  SUCCESS: 2000,
  EXPIRE: 2003,
  ERRMESSAGE: '请求失败',
  TIMEOUT: 25000,
} as const;

export const pythonService = axios.create({
  baseURL: '/py-api',
  timeout: ResultEnumPython.TIMEOUT,
});

function getHttpErrorMessage(error: AxiosError): string {
  const status = error.response?.status;
  switch (status) {
    case 401:
      return 'token 失效，请重新登录';
    case 403:
      return '拒绝访问';
    case 404:
      return '请求地址错误';
    case 500:
      return '服务器故障';
    default:
      return '网络连接故障';
  }
}

pythonService.interceptors.request.use(
  (config) => config,
  (error: AxiosError) => {
    ElMessage.error(error.message);
    return Promise.reject(error);
  }
);

pythonService.interceptors.response.use(
  (response: AxiosResponse<ResultData<unknown>>) => {
    const { data } = response;
    if (data.code === ResultEnumPython.EXPIRE) {
      ElMessage.error(data.message || ResultEnumPython.ERRMESSAGE);
      return Promise.reject(data);
    }
    if (data.code !== ResultEnumPython.SUCCESS) {
      ElMessage.error(data.message || ResultEnumPython.ERRMESSAGE);
      return Promise.reject(data);
    }
    return response;
  },
  (error: AxiosError) => {
    ElMessage.error(getHttpErrorMessage(error));
    return Promise.reject(error);
  }
);

export const pythonHttp = {
  async get<T = unknown>(url: string, params?: object, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    const response = await pythonService.get<ResultData<T>>(url, { params, ...config });
    return response.data;
  },

  async post<T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    const response = await pythonService.post<ResultData<T>>(url, data, config);
    return response.data;
  },

  async put<T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    const response = await pythonService.put<ResultData<T>>(url, data, config);
    return response.data;
  },

  async delete<T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    const response = await pythonService.delete<ResultData<T>>(url, { data, ...config });
    return response.data;
  },
};
