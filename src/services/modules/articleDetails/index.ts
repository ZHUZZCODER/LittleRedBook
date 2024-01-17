import zhuRequest from '@/services/request';

export const getArticleDetail = (params: {id: number}) => {
  return zhuRequest.GET({
    url: '/article/articleDetail',
    params,
  });
};
