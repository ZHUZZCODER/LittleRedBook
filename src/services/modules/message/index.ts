import zhuRequest from '@/services/request';

export const getMessageList = (params: {page: number; size: number}) => {
  return zhuRequest.GET({
    url: '/message/messageList',
    params,
  });
};

export const getUnread = () => {
  return zhuRequest.GET({
    url: '/message/unread',
  });
};
