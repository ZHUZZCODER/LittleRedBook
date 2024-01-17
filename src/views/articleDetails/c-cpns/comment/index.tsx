import HeartIcon from '@/components/WaterfallFlowList/c-cpns/HeartIcon';
import {dateFormat} from '@/utils/date';
import message from '@/views/message';
import React, {memo} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';

interface IProps {
  children?: ReactNode;
  commentData: {
    avatarUrl: string;
    userName: string;
    message: string;
    dateTime: string;
    isFavorite: boolean;
    favoriteCount: number;
  };
  isShowDivider: boolean;
}

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const Comment: FC<IProps> = props => {
  const {
    commentData: {
      avatarUrl,
      userName,
      message,
      dateTime,
      isFavorite,
      favoriteCount,
    },
    isShowDivider,
    children,
  } = props;
  return (
    <>
      <View style={styles.container}>
        <View style={styles.commentContainer}>
          <Image src={avatarUrl} style={styles.avatarImg} />
          <View style={styles.commentContentBox}>
            <Text style={styles.commentName}>{userName}</Text>
            <Text style={styles.commentMessage}>
              {message}
              <Text style={styles.dateTx}>
                {dateFormat(new Date(dateTime), 'MM-DD')}
              </Text>
            </Text>
          </View>
          <View style={styles.heartBox}>
            <HeartIcon defaultValue={isFavorite} />
            <Text style={styles.heartCount}>{favoriteCount}</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 12,
            width: SCREEN_WIDTH - 80,
            alignItems: 'flex-end',
          }}>
          {!!children && children}
        </View>
      </View>

      {isShowDivider && <View style={styles.divider}></View>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  commentContainer: {
    flexDirection: 'row',
  },
  avatarImg: {
    width: 36,
    height: 36,
    resizeMode: 'cover',
    borderRadius: 18,
  },
  commentContentBox: {
    flex: 1,
    marginHorizontal: 12,
  },
  commentName: {
    fontSize: 12,
    color: '#999',
  },
  commentMessage: {
    fontSize: 14,
    color: '#333',
    marginTop: 6,
  },
  dateTx: {
    fontSize: 12,
    color: '#bbb',
  },
  heartBox: {
    alignItems: 'center',
  },
  heartCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  divider: {
    width: '100%',
    marginLeft: 34,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
});

export default memo(Comment);
