import React, {memo, useCallback, useMemo} from 'react';
import type {FC, ReactNode, ReactElement, ComponentType} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Platform,
  Dimensions,
} from 'react-native';
import type {GoodsSimple} from '@/store/shop';
import GoodsListItem from '../goodsListItem';
import goodsCategory from '../goodsCategory';
import GoodsCategory from '../goodsCategory';
import type {PlanObject} from '@/type/base';

interface IProps {
  children?: ReactNode;
  goodsList: GoodsSimple[];
  ListHeaderComponent?: ReactElement | ComponentType<unknown>;
  listHeaerData?: PlanObject[];
}

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const goodsWidth = (SCREEN_WIDTH - 18) >> 1;

const GoodsList: FC<IProps> = props => {
  const {goodsList, ListHeaderComponent, listHeaerData = []} = props;
  const isEven = useCallback((num: number): boolean => {
    return num % 2 === 0;
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: GoodsSimple; index: number}) => {
      const customStyle = isEven(index) ? styles.evenStyle : styles.oddStyle;
      return (
        <GoodsListItem
          goods={item}
          goodsWidth={goodsWidth}
          style={customStyle}
        />
      );
    },
    [],
  );

  return (
    <FlatList
      numColumns={2}
      data={goodsList}
      //除开data外需要刷新的数据
      extraData={[listHeaerData]}
      //设置key
      keyExtractor={({id}: GoodsSimple) => `${id}`}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
      style={styles.container}></FlatList>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  evenStyle: {
    marginRight: 6,
    marginLeft: 6,
    marginTop: 6,
  },
  oddStyle: {
    marginRight: 6,
    marginTop: 6,
  },
});

export default memo(GoodsList);
