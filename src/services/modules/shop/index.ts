import zhuRequest from '@/services/request';

//获取商品列表
export const getGoodsList = (params: {page: number; size: number}) => {
  return zhuRequest.GET({
    url: '/goods/goodsList',
    showLoading: true,
    params,
  });
};

//获取商品分类
export const getTop10Category = () => {
  return zhuRequest.GET({
    url: '/goods/top10Category',
  });
};
