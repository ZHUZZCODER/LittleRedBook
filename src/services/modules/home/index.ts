import zhuRequest from '@/services/request';

export type HomeListParams = {
  page: number;
  size: number;
};

export const getHomeList = (params: HomeListParams) => {
  return zhuRequest.GET({
    url: '/home/homeList',
    showLoading: true,
    params,
  });
};
