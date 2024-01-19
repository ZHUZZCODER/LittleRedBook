import React, {memo, useCallback} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import IconMenu from '@/assets/images/icon_menu.png';
import IconShopCar from '@/assets/images/icon_shop_car.png';
import IconShare from '@/assets/images/icon_share.png';

interface IProps {
  children?: ReactNode;
  menuCb?: () => void;
}

const MineNav: FC<IProps> = props => {
  const {menuCb} = props;
  const hanldeMenuPress = useCallback(() => {
    menuCb?.();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={hanldeMenuPress} style={styles.menuBox}>
        <Image source={IconMenu} style={styles.menuIcon} />
      </TouchableOpacity>
      <View style={styles.centerBar}></View>
      <TouchableOpacity style={styles.rightMenuBox}>
        <Image source={IconShopCar} style={styles.menuIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightMenuBox}>
        <Image source={IconShare} style={styles.menuIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
  },
  centerBar: {
    flex: 1,
  },
  menuBox: {
    paddingHorizontal: 16,
  },
  menuIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  rightMenuBox: {
    paddingHorizontal: 12,
  },
});

export default memo(MineNav);
