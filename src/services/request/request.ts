import axios from 'axios';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosRequestHeaders,
} from 'axios';
import Loading, {GlobalLoading} from '@/components/Loading';

interface Interceptors<T = AxiosResponse> {
  requestInterceptor?: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig;
  requestInterceptorCatch?: (err: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (err: any) => any;
}

interface RequstConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: Interceptors<T>;
  showLoading?: boolean;
}

type ConfigInterceptors<T = AxiosResponse> = Omit<
  Interceptors<T>,
  'requestInterceptor'
>;

interface MethodInterceptors<T = AxiosResponse> extends ConfigInterceptors<T> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
}

interface RequestMethodConfig<T> extends AxiosRequestConfig {
  interceptors?: MethodInterceptors<T>;
  showLoading?: boolean;
}

class ZHURequest {
  instance: AxiosInstance;
  interceptors?: Interceptors;
  showLoading?: boolean;
  constructor(config: RequstConfig) {
    this.instance = axios.create(config);
    if (config.interceptors) this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? false;
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch,
    );
    this.instance.interceptors.request.use(
      config => {
        if (this.showLoading) {
          GlobalLoading.show();
        }
        // console.log('config=', config);
        return config;
      },
      err => {
        // console.log('requestErr=', err);
        return err;
      },
    );
    this.instance.interceptors.response.use(
      res => {
        console.log('res=', res);
        if (this.showLoading) GlobalLoading.hide();
        return res.data;
      },
      err => {
        if (this.showLoading) GlobalLoading.hide();
        return err;
      },
    );
  }

  request<T = any>(config: RequestMethodConfig<T>): Promise<T> {
    if (config.showLoading) {
      GlobalLoading.show();
    }
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      this.instance
        .request<any, T>(config)
        .then(res => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          if (config.showLoading) GlobalLoading.hide();
          resolve(res);
          return res;
        })
        .catch(err => {
          if (config.showLoading) GlobalLoading.hide();
          reject(err);
          return err;
        });
    });
  }

  POST<T = any>(config: RequestMethodConfig<T>): Promise<T> {
    return this.request({...config, method: 'POST'});
  }

  GET<T = any>(config: RequestMethodConfig<T>): Promise<T> {
    return this.request({...config, method: 'GET'});
  }
}

export default ZHURequest;
