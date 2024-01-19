import zhuRequest from '@/services/request';

export const getAccountInfo = () => {
  return zhuRequest.GET({
    url: '/mine/accountInfo',
  });
};

export const getNoteList = () => {
  return zhuRequest.GET({
    url: '/mine/noteList',
  });
};

export const getCollectionList = () => {
  return zhuRequest.GET({
    url: '/mine/collectionList',
  });
};

export const getFavorateList = () => {
  return zhuRequest.GET({
    url: '/mine/favorateList',
  });
};
