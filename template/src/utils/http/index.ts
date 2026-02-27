import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import ElementPlus from 'element-plus';
import type { ResultData } from '@/utils/http/types';

const ElMessage = (ElementPlus as unknown as { ElMessage: { error: (message: string) => void } }).ElMessage;

const ResultEnumPython = {
  SUCCESS: 2000,
  EXPIRE: 2003,
  ERRMESSAGE: '请求失败',
  TIMEOUT: 25000,
} as const;

const pythonService = axios.create({
  baseURL: '/py-api',
  timeout: ResultEnumPython.TIMEOUT,
});

pythonService.interceptors.request.use(
  (config) => config,
  (error: AxiosError) => {
    ElMessage.error(error.message);
    return Promise.reject(error);
  }
);

pythonService.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    // * 登陆失效（code == 203）
    if (data.code === ResultEnumPython.EXPIRE) {
      ElMessage.error(data.msg || data.message || ResultEnumPython.ERRMESSAGE);
      return Promise.reject(data);
    }

    if (data.code && data.code !== ResultEnumPython.SUCCESS) {
      ElMessage.error(data.msg || data.message || ResultEnumPython.ERRMESSAGE);
      return Promise.reject(data);
    }
    return data;
  },
  (error: AxiosError) => {
    // 处理 HTTP 网络错误
    let message = '';
    // HTTP 状态码
    const status = error.response?.status;
    switch (status) {
      case 401:
        message = 'token 失效，请重新登录';
        break;
      case 403:
        message = '拒绝访问';
        break;
      case 404:
        message = '请求地址错误';
        break;
      case 500:
        message = '服务器故障';
        break;
      default:
        message = '网络连接故障';
    }

    ElMessage.error(message);
    return Promise.reject(error);
  }
);

const pythonHttp = {
  get<T = unknown>(url: string, params?: object, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    return pythonService.get(url, { params, ...config });
  },

  post<T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    return pythonService.post(url, data, config);
  },

  put<T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    return pythonService.put(url, data, config);
  },

  delete<T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    return pythonService.delete(url, { data, ...config });
  },
};

export { pythonHttp, pythonService };
