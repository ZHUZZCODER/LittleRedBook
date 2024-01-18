import React, {memo} from 'react';
import type {FC, ReactNode} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//预设页面过渡动画
import {TransitionPresets} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Welcome from '@/views/welcome';
import Login from '@/views/login';
// import Home from '@/views/home';
import NavigationTab from './NavigationTab';
import ArticleDetails from '@/views/articleDetails';
import SearchGoods from '@/views/searchGoods';

interface IProps {
  children?: ReactNode;
}

const Stack = createNativeStackNavigator();

const NavigationStack: FC<IProps> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            //页面，右侧滑动动画 (暂时在当前版本没发现有什么区别)
            ...(TransitionPresets.SlideFromRightIOS as any),
          }}
        />
        <Stack.Screen
          name="MainHome"
          component={NavigationTab}
          options={{
            headerShown: false,
            //页面，右侧滑动动画 (暂时在当前版本没发现有什么区别)
            ...(TransitionPresets.SlideFromRightIOS as any),
          }}
        />
        <Stack.Screen
          name="ArticleDetials"
          component={ArticleDetails}
          options={{
            headerShown: false,
            //页面，右侧滑动动画 (暂时在当前版本没发现有什么区别)
            ...(TransitionPresets.SlideFromRightIOS as any),
          }}
        />
        <Stack.Screen
          name="SearchGoods"
          component={SearchGoods}
          options={{
            headerShown: false,
            /**
             * 透明模式就像覆盖屏幕的模式对话框。
             * 之前的屏幕在下面仍然可见。要获得透明的模态屏幕，
             * 您可以presentation: 'transparentModal'在屏幕的选项中指定。
             */
            presentation: 'transparentModal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(NavigationStack);
