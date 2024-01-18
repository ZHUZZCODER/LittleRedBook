import React, {memo, useCallback} from 'react';
import type {FC, ReactNode, ReactElement, ComponentType} from 'react';
import {StyleSheet, View, Text, FlatList, Image} from 'react-native';
import IconToTop from '@/assets/images/icon_to_top.png';
import type {MessageListItem} from '@/store/message';
import {PlanObject} from '@/type/base';

interface IProps {
  children?: ReactNode;
  messageList: MessageListItem[];
  ListEmptyComponent?: ReactElement | ComponentType<unknown>;
  ListHeaderComponent?: ReactElement | ComponentType<unknown>;
  headerData?: PlanObject[];
}

const MessageList: FC<IProps> = props => {
  const {
    messageList,
    ListEmptyComponent,
    ListHeaderComponent,
    headerData = [],
  } = props;

  const renderItem = useCallback(
    ({
      item: {id, name, avatarUrl, lastMessage, lastMessageTime},
    }: {
      item: MessageListItem;
    }) => {
      return (
        <View style={styles.flatListItem}>
          <Image src={avatarUrl} style={styles.avatarIcon} />
          <View style={styles.contentLayout}>
            <Text style={styles.titleTx}>{name}</Text>
            <Text style={styles.titleDesc}>{lastMessage}</Text>
          </View>
          <View style={styles.timeBox}>
            <Text style={styles.timeTx}>{lastMessageTime}</Text>
            <Image source={IconToTop} style={styles.timeImg} />
          </View>
        </View>
      );
    },
    [],
  );

  return (
    <FlatList
      data={messageList}
      keyExtractor={({
        id,
        name,
        avatarUrl,
      }: {
        id: number;
        name: string;
        avatarUrl: string;
      }) => `${id}-${name}-${avatarUrl}`}
      extraData={[headerData]}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      style={styles.container}></FlatList>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    paddingHorizontal: 16,
  },
  avatarIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    resizeMode: 'cover',
  },
  contentLayout: {
    flex: 1,
    marginHorizontal: 12,
  },
  titleTx: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  titleDesc: {
    fontSize: 15,
    color: '#999',
    marginTop: 4,
  },
  timeBox: {},
  timeTx: {
    fontSize: 12,
    color: '#999',
  },
  timeImg: {
    width: 8,
    height: 16,
    marginTop: 6,
    resizeMode: 'contain',
  },
});

export default memo(MessageList);
