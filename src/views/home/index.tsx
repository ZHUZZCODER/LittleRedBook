import React, {memo, useCallback, useEffect} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text, StatusBar, Platform} from 'react-native';
import {observer} from 'mobx-react';
import HomeHeader from './c-cpns/HomeHeader';
import WaterfallFlowList from '@/components/WaterfallFlowList';
import {useStore} from '@/store';
import HeaderCategory from './c-cpns/HeaderCategory';
import {useNavigation} from '@react-navigation/native';
import type {NavigationScreenProps} from '@/router';
import LocalStorage from '@/utils/storage';

//热更新
import {
  onPushyEvents,
  isFirstTime,
  markSuccess,
  isRolledBack,
  checkUpdate,
  downloadUpdate,
  switchVersion,
  switchVersionLater,
} from 'react-native-update';
import _updateConfig from '../../../update.json';
import {PlanObject} from '@/type/base';
const {appKey} = _updateConfig[Platform.OS];
onPushyEvents(({type, data}) => {
  // 热更成功或报错的事件回调
  // 可上报自有或第三方数据统计服务
});

interface IProps {
  children?: ReactNode;
}

const Home: FC<IProps> = props => {
  const navigation = useNavigation<NavigationScreenProps>();
  const {homeStore} = useStore();

  //热更新代码
  const checkUpdateFn = async () => {
    if (__DEV__) {
      // 开发模式不支持热更新，跳过检查
      return;
    }
    const info = await checkUpdate(appKey);
    const {update, name, description, meatInfo} = info as PlanObject;
    LocalStorage.setCache('patchVersion', name);
    const {forceUpdate} = meatInfo as PlanObject;
    if (forceUpdate) {
      //弹窗提示用户
    } else {
      //不弹窗默认操作
    }
    //检测到新版本
    if (update) {
      const hash = await downloadUpdate(info as any, {
        onDownloadProgress: ({received, total}) => {
          //下载进度
          // 已下载的字节数, 总字节数
          console.log(received, total);
        },
      });
      //当前热更新版本的唯一标识
      if (hash) {
        if (forceUpdate) {
          //立即更新
          switchVersion(hash);
        } else {
          //下次启动更新
          switchVersionLater(hash);
        }
      }
    }
  };

  useEffect(() => {
    checkUpdateFn();
    if (isFirstTime) {
      // 必须调用此更新成功标记方法
      // 否则默认更新失败，下一次启动会自动回滚
      markSuccess();
      console.log('更新完成');
    } else if (isRolledBack) {
      console.log('刚刚更新失败了,版本被回滚.');
    }
  }, []);

  //注意：修改数据得用homeStore，或者解构后绑定this，不然修改数据不生效
  useEffect(() => {
    homeStore.requestChangeHomeList();
    homeStore.changeCategoryList();
  }, []);

  const handleDetialPress = useCallback(
    (id: number) => {
      navigation.push('ArticleDetials', {id});
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <HomeHeader />
      <View style={styles.flowListContainer}>
        {!!homeStore.homeList.length && (
          <WaterfallFlowList
            refreshing={homeStore.refreshing}
            data={homeStore.homeList}
            onRefresh={() => homeStore.resetPageIndex()}
            onEndReached={() => homeStore.requestChangeHomeList()}
            isEndStatus={homeStore.isEnd}
            extraData={homeStore.refreshing}
            headerComponent={<HeaderCategory />}
            onDetailPress={handleDetialPress}
            isResizeImg={true}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
  },
  flowListContainer: {
    width: '100%',
    flex: 1,
  },
});

export default memo(observer(Home));
