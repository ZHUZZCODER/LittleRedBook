import React, {memo, useEffect} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ShopNav from './c-cpns/shopNav';
import {useStore} from '@/store';
import GoodsCategory from './c-cpns/goodsCategory';
import {observer} from 'mobx-react';
import GoodsList from './c-cpns/goodsList';

interface IProps {
  children?: ReactNode;
}

const Shop: FC<IProps> = props => {
  const {shopStore} = useStore();
  const {goodsCategoryList, goodsList} = shopStore;

  useEffect(() => {
    shopStore.requestGoodsCategory();
    shopStore.requestGoodsList();
  }, []);

  return (
    <View style={styles.container}>
      <ShopNav />
      {!!goodsList.length && (
        <GoodsList
          goodsList={goodsList}
          listHeaerData={goodsCategoryList}
          ListHeaderComponent={
            <GoodsCategory goodsCategoryList={goodsCategoryList} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default memo(observer(Shop));
