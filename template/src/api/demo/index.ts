import { pythonHttp } from '@/utils/http';

const API_BASE_URL = '/api/porc/python_model';

export const getDemo = async () => {
  const response = await pythonHttp.get(`${API_BASE_URL}/demo`);
  return response.data;
};
