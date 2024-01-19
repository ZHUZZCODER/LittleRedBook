import React, {memo, useCallback, useEffect, useMemo, useRef} from 'react';
import type {FC, ReactNode, ElementRef} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import type {GestureResponderEvent} from 'react-native';
import {observer} from 'mobx-react';
import {useStore} from '@/store';
import MessageNav from './c-cpns/messageNav';
import CountNav from './c-cpns/countNav';
import IconStar from '@/assets/images/icon_star.png';
import IconNewFollow from '@/assets/images/icon_new_follow.png';
import IconComments from '@/assets/images/icon_comments.png';
import {isObject} from '@/utils/type';
import type {UnRead} from '@/store/message';
import MessageList from './c-cpns/messageList';
import Empty from '@/components/Empty';
import IconNoCollection from '@/assets/images/icon_no_collection.webp';
import MessageModal from './c-cpns/messageModal';

interface IProps {
  children?: ReactNode;
}

const Message: FC<IProps> = props => {
  const {messageStore} = useStore();
  const {unRead, messageList} = messageStore;
  //modal实例
  const modalIntance = useRef<ElementRef<typeof MessageModal>>(null);
  useEffect(() => {
    messageStore.requestMessageList();
    messageStore.requestUnread();
  }, []);

  const countList = useMemo(() => {
    if (isObject<UnRead>(unRead)) {
      const createCountList = [
        {
          icon: IconStar,
          name: '赞和搜藏',
          count: unRead.unreadFavorate,
        },
        {
          icon: IconNewFollow,
          name: '新增关注',
          count: unRead.newFollow,
        },
        {
          icon: IconComments,
          name: '评论和@',
          count: unRead.comment,
        },
      ];
      return createCountList;
    } else {
      return [];
    }
  }, [unRead]);

  const handleOpenModal = useCallback(
    ({nativeEvent: {pageY}}: GestureResponderEvent) => {
      modalIntance.current?.showModal(pageY + 48);
    },
    [modalIntance.current],
  );

  return (
    <View style={styles.container}>
      <MessageNav messageGroupFn={handleOpenModal} />
      {!!messageList.length && (
        <MessageList
          messageList={messageList}
          headerData={countList}
          ListHeaderComponent={<CountNav countList={countList} />}
          ListEmptyComponent={
            <Empty
              emptyData={{
                icon: IconNoCollection,
                tips: '暂无消息',
              }}
            />
          }
        />
      )}
      <MessageModal ref={modalIntance} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight,
  },
});

export default memo(observer(Message));
