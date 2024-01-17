import React, {memo, useCallback, useMemo, useRef} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import WaterfallFlow from '@/components/WaterfallFlow';
import type {HomeList} from '@/store/home';
import IconHeartEmpty from '@/assets/images/icon_heart_empty.png';
import ProportionImage from '../ProportionImage';
import HeartIcon from './c-cpns/HeartIcon';
import {throttleFn} from '@/utils/utils';
import {observer} from 'mobx-react';
import {useStore} from '@/store';

// type Data = Pick<
//   HomeList,
//   'avatarUrl' | 'image' | 'favoriteCount' | 'isFavorite' | 'userName'
// >;

interface IProps {
  children?: ReactNode;
  numColumns?: number;
  data: HomeList[];
  //下拉加载更多
  onRefresh?: () => void;
  //上拉刷新
  onEndReached?: () => void;
  //刷新状态
  refreshing: boolean;
  footComponent?: JSX.Element;
  //是否到底部
  isEndStatus?: boolean;
  extraData: any;
  //头部组件
  headerComponent?: JSX.Element;
  //点击跳转函数
  onDetailPress?: (id: number) => void;
}

const WaterfallFlowList: FC<IProps> = ({
  data,
  numColumns = 2,
  onEndReached,
  refreshing,
  footComponent,
  isEndStatus = false,
  onRefresh,
  extraData,
  headerComponent,
  onDetailPress,
}) => {
  const numColumnsVal = useRef(numColumns);

  //处理点击
  const handleDetailPress = useCallback(
    (detailId: number) => {
      onDetailPress?.(detailId);
    },
    [onDetailPress],
  );

  //渲染每一项
  const handleRenderItem = useCallback(
    ({
      item: {image, title, avatarUrl, userName, favoriteCount, isFavorite, id},
      columnIndex,
    }: {
      item: HomeList;
      columnIndex: number;
    }) => {
      return (
        <TouchableOpacity
          onPress={() => handleDetailPress(id)}
          style={[
            FlowItemStyle.flowContainer,
            {
              marginLeft: columnIndex === 0 ? 6 : 0,
            },
          ]}>
          <ProportionImage src={image} />
          <View style={FlowItemStyle.infoBox}>
            <Text style={FlowItemStyle.titleTx}>{title}</Text>
            <View style={FlowItemStyle.infoMsg}>
              <Image src={avatarUrl} style={FlowItemStyle.avatarImg} />
              <Text style={FlowItemStyle.avatarTx}>{userName}</Text>

              {/* <Image source={IconHeartEmpty} style={FlowItemStyle.heartImg} /> */}
              <HeartIcon defaultValue={isFavorite} />
              <Text style={FlowItemStyle.heartTx}>{favoriteCount}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [],
  );

  //上拉加载更多
  const handleEndReached = useCallback(() => {
    onEndReached?.();
  }, [onEndReached]);

  //下拉刷新
  const hanldeOnRefresh = useCallback(() => {
    onRefresh?.();
  }, [onRefresh]);

  //底部组件
  const defaultFootComponent = useMemo(() => {
    return <Text style={styles.endFootTx}>没有更多数据</Text>;
  }, []);

  if (!footComponent) footComponent = defaultFootComponent;

  return (
    <WaterfallFlow
      data={data}
      numColumns={numColumnsVal.current}
      renderItem={handleRenderItem}
      keyExtractor={(item: {id: string | number}) => `${item.id}`}
      //什么时候重新渲染
      extraData={extraData}
      //刷新状态
      refreshing={refreshing}
      // 距离底部多远触发刷新
      onEndReachedThreshold={0.1}
      //下拉刷新
      onRefresh={hanldeOnRefresh}
      //上拉加载更多
      onEndReached={handleEndReached}
      //头部组件
      ListHeaderComponent={headerComponent}
      ListFooterComponent={isEndStatus ? footComponent : ''}
      contentContainerStyle={styles.containerStyle}
    />
  );
};

const FlowItemStyle = StyleSheet.create({
  flowContainer: {
    borderRadius: 8,
    backgroundColor: 'red',
    marginRight: 6,
    marginBottom: 6,
    overflow: 'hidden',
  },
  flowImage: {
    width: '100%',
    height: 300,
  },
  infoBox: {
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  titleTx: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 10,
    marginVertical: 4,
  },
  infoMsg: {
    flexDirection: 'row',
  },
  avatarImg: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  avatarTx: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
    flex: 1,
  },
  heartImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  heartTx: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
});

const styles = StyleSheet.create({
  containerStyle: {},
  endFootTx: {
    position: 'relative',
    left: -6,
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 14,
    color: '#999',
  },
});

export default memo(WaterfallFlowList);
