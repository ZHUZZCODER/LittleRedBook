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
import {useHotUpdate} from '@/hooks';
interface IProps {
  children?: ReactNode;
}

const Home: FC<IProps> = props => {
  const navigation = useNavigation<NavigationScreenProps>();
  const {homeStore} = useStore();
  // useHotUpdate();

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
