import ZHURequest from './request';
import {API_URL} from '@/config';

const AxiosRequest = new ZHURequest({
  baseURL: API_URL,
  timeout: 10000,
  interceptors: {
    requestInterceptor: config => {
      return config;
    },
    requestInterceptorCatch: err => {},
    responseInterceptor: res => {
      return res;
    },
    responseInterceptorCatch(err) {},
  },
});

export default AxiosRequest;
