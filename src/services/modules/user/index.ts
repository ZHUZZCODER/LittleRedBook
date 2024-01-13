import AxiosRequest from '@/services/request';

export const userLogin = (params: {name: string; pwd: string}) => {
  return AxiosRequest.GET({
    url: '/user/login',
    params,
  });
};
