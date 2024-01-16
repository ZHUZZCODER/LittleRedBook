import React, {memo} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '@/views/home';
import Shop from '@/views/shop';
import Publish from '@/views/publish';
import Message from '@/views/message';
import Mine from '@/views/mine';
import IconTabPublish from '@/assets/images/icon_tab_publish.png';
import {getLaunchImageLibray} from '@/utils/imagePickerUtils';
import {PlanObject} from '@/type/base';

interface IProps {
  children?: ReactNode;
}
type NavigationTabProps = {
  [P in keyof BottomTabBarProps]: BottomTabBarProps[P];
};

const Tab = createBottomTabNavigator();

const NavigationTab: FC<IProps> = props => {
  const TabStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 52,
      backgroundColor: 'white',
    },
    tabBarItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabBarTx: {
      fontSize: 16,
      color: '#999',
      fontWeight: 'normal',
    },
    tabBarActiveTx: {
      fontSize: 18,
      color: '#333',
      fontWeight: 'bold',
    },
    publichIcon: {
      width: 58,
      height: 42,
      resizeMode: 'contain',
    },
  });
  const renderTabBar = (props: BottomTabBarProps) => {
    const {
      state: {routeNames, index: routeIndex, routes},
      navigation,
      descriptors,
    } = props;
    //获取相册图片
    const handleGetPhotoAlbum = async () => {
      const {assets} = await getLaunchImageLibray();
      if (assets) {
        const {fileName, fileSize, height, type, uri, width} = assets[0];
        console.log(
          '获取系统相册=',
          `filename=$${fileName},fileSize=${fileSize},height=${height},type=${type},uri=${uri},width=${width}`,
        );
      }
    };

    return (
      <View style={TabStyles.container}>
        {routes.map(({name: routeName, key: routeKey}, index) => {
          const {
            options: {title: tabBarName},
          } = descriptors[routeKey];
          if (index === 2) {
            return (
              <TouchableOpacity
                key={routeName}
                onPress={handleGetPhotoAlbum}
                style={TabStyles.tabBarItem}>
                <Image source={IconTabPublish} style={TabStyles.publichIcon} />
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity
              key={routeName}
              onPress={() => {
                navigation.navigate(routeName);
              }}
              style={TabStyles.tabBarItem}>
              <Text
                style={[
                  TabStyles.tabBarTx,
                  routeIndex === index ? TabStyles.tabBarActiveTx : {},
                ]}>
                {tabBarName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <Tab.Navigator tabBar={renderTabBar}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: '首页',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          title: '购物',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Publish"
        component={Publish}
        options={{
          title: '发布',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          title: '消息',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Mine"
        component={Mine}
        options={{
          title: '我的',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default memo(NavigationTab);
