import React, {memo, useCallback} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import IconSearch from '@/assets/images/icon_search.png';
import IconShopCar from '@/assets/images/icon_shop_car.png';
import IconOrders from '@/assets/images/icon_orders.png';
import IconMenuMore from '@/assets/images/icon_menu_more.png';
import {useNavigation} from '@react-navigation/native';
import type {NavigationScreenProps} from '@/router';

interface IProps {
  children?: ReactNode;
}

const ShopNav: FC<IProps> = props => {
  const navigation = useNavigation<NavigationScreenProps>();
  const handleSearchPress = useCallback(() => {
    navigation.push('SearchGoods');
  }, [navigation]);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSearchPress} style={styles.searchBox}>
        <Image source={IconSearch} style={styles.searchIcon} />
        <Text style={styles.searchTx}>bm吊带1</Text>
      </TouchableOpacity>
      <Image source={IconShopCar} style={styles.menuIcon} />
      <Image source={IconOrders} style={styles.menuIcon} />
      <Image source={IconMenuMore} style={styles.menuIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  searchBox: {
    height: 32,
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchIcon: {
    width: 18,
    height: 18,
  },
  searchTx: {
    fontSize: 14,
    color: '#bbb',
    marginLeft: 6,
    position: 'relative',
    top: -2,
  },
  menuIcon: {
    width: 22,
    height: 22,
    marginHorizontal: 6,
  },
});

export default memo(ShopNav);
