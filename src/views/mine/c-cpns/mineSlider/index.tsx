import React, {
  memo,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import type {FC, ReactNode} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  LayoutAnimation,
} from 'react-native';
import LocalStorage from '@/utils/storage';
import IconGroup from '@/assets/images/icon_group.png';
import IconCreateGroup from '@/assets/images/icon_create_group.png';
import icon_setting from '@/assets/images/icon_setting.png';
import icon_service from '@/assets/images/icon_service.png';
import icon_scan from '@/assets/images/icon_scan.png';
import icon_fid_user from '@/assets/images/icon_find_user.png';
import icon_draft from '@/assets/images/icon_draft.png';
import icon_create_center from '@/assets/images/icon_create_center.png';
import icon_browse_histroy from '@/assets/images/icon_browse_history.png';
import icon_packet from '@/assets/images/icon_packet.png';
import icon_free_net from '@/assets/images/icon_free_net.png';
import icon_nice_goods from '@/assets/images/icon_nice_goods.png';
import icon_orders from '@/assets/images/icon_orders.png';
import icon_shop_car from '@/assets/images/icon_shop_car.png';
import icon_coupon from '@/assets/images/icon_coupon.png';
import icon_wish from '@/assets/images/icon_wish.png';
import icon_red_vip from '@/assets/images/icon_red_vip.png';
import icon_community from '@/assets/images/icon_community.png';
import icon_exit from '@/assets/images/icon_exit.png';
import {useNavigation} from '@react-navigation/native';
import type {NavigationScreenProps} from '@/router';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const ContentWidth = SCREEN_WIDTH * 0.75;

const MENUS = [
  [{icon: icon_fid_user, name: '发现好友'}],
  [
    {icon: icon_draft, name: '我的草稿'},
    {icon: icon_create_center, name: '创作中心'},
    {icon: icon_browse_histroy, name: '浏览记录'},
    {icon: icon_packet, name: '钱包'},
    {icon: icon_free_net, name: '免流量'},
    {icon: icon_nice_goods, name: '好物体验'},
  ],
  [
    {icon: icon_orders, name: '订单'},
    {icon: icon_shop_car, name: '购物车'},
    {icon: icon_coupon, name: '卡券'},
    {icon: icon_wish, name: '心愿单'},
    {icon: icon_red_vip, name: '小红书会员'},
  ],
  [
    {icon: icon_community, name: '社区公约'},
    {icon: icon_exit, name: '退出登陆'},
  ],
];

const BOTTOM_MENUS = [
  {icon: icon_setting, txt: '设置'},
  {icon: icon_service, txt: '帮助与客服'},
  {icon: icon_scan, txt: '扫一扫'},
];

interface IProps {
  children?: ReactNode;
}

export type MessageModalInstance = {
  showModal(): void;
  hideModal(): void;
};

const MineSlider = forwardRef<MessageModalInstance, IProps>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  //内容展开
  const [open, setOpen] = useState<boolean>(false);
  const navigation = useNavigation<NavigationScreenProps>();

  useImperativeHandle(ref, () => ({
    showModal,
    hideModal,
  }));

  const showModal = () => {
    setVisible(true);
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      setOpen(true);
    }, 100);
  };

  const hideModal = () => {
    LayoutAnimation.easeInEaseOut();
    setOpen(false);
    setTimeout(() => {
      setVisible(false);
    }, 300);
  };

  const onMenuItemPress = useCallback(
    (item: any) => async () => {
      if (item.name === '退出登陆') {
        hideModal();
        await LocalStorage.removeCache('userInfo');
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'} as any],
        });
      }
    },
    [navigation],
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      //是否位于状态栏下方
      statusBarTranslucent={true}
      //动画类型
      animationType="fade"
      //手势关闭
      onRequestClose={hideModal}>
      <TouchableOpacity onPress={hideModal} style={styles.container}>
        <View style={[styles.content, {marginLeft: open ? 0 : -ContentWidth}]}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewcontainer}
            showsVerticalScrollIndicator={false}>
            {MENUS.map((item, index) => {
              return (
                <View key={`${index}`}>
                  {item.map((subItem, subIndex) => {
                    return (
                      <TouchableOpacity
                        key={`${index}-${subIndex}`}
                        style={styles.menuItem}
                        onPress={onMenuItemPress(subItem)}>
                        <Image
                          style={styles.menuItemIcon}
                          source={subItem.icon}
                        />
                        <Text style={styles.menuItemTxt}>{subItem.name}</Text>
                      </TouchableOpacity>
                    );
                  })}

                  {index !== MENUS.length - 1 && (
                    <View style={styles.divideLine} />
                  )}
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.bottomLayout}>
            {BOTTOM_MENUS.map(item => {
              return (
                <TouchableOpacity
                  key={`${item.txt}`}
                  style={styles.bottomMenuItem}>
                  <View style={styles.bottomMenuIconWrap}>
                    <Image style={styles.bottomMenuIcon} source={item.icon} />
                  </View>
                  <Text style={styles.bottomMenuTxt}>{item.txt}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000C0',
  },
  content: {
    height: '100%',
    width: ContentWidth,
    backgroundColor: 'white',
  },
  scrollView: {
    width: '100%',
    flex: 1,
  },
  bottomLayout: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 20,
  },
  bottomMenuItem: {
    flex: 1,
    alignItems: 'center',
  },
  bottomMenuIconWrap: {
    width: 44,
    height: 44,
    backgroundColor: '#f0f0f0',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomMenuIcon: {
    width: 26,
    height: 26,
  },
  bottomMenuTxt: {
    fontSize: 13,
    color: '#666',
    marginTop: 8,
  },
  divideLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#eee',
  },
  menuItem: {
    width: '100%',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  menuItemTxt: {
    fontSize: 16,
    color: '#333',
    marginLeft: 14,
  },
  scrollViewcontainer: {
    paddingTop: 72,
    paddingHorizontal: 28,
    paddingBottom: 12,
  },
});

export default memo(MineSlider);
