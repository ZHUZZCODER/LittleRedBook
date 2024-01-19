import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {ElementRef, FC, ReactNode} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import MineNav from './c-cpns/mineNav';
import IconMenuBg from '@/assets/images/icon_mine_bg.png';
import MineInfo from './c-cpns/mineInfo';
import {observer} from 'mobx-react';
import {useStore} from '@/store';
import NavTabs from '@/components/NavTabs';
import type {LayoutChangeEvent} from 'react-native';
import WaterfallFlowList from '@/components/WaterfallFlowList';
import type {ArticleSimple} from '@/store/mine';
import {isObject} from '@/utils/type';
import {useNavigation} from '@react-navigation/native';
import type {NavigationScreenProps} from '@/router';
import HeartIcon from '@/components/WaterfallFlowList/c-cpns/HeartIcon';
import MineSlider from './c-cpns/mineSlider';
import type {MessageModalInstance} from './c-cpns/mineSlider';

interface IProps {
  children?: ReactNode;
}
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const Mine: FC<IProps> = props => {
  const navigation = useNavigation<NavigationScreenProps>();
  const {mineStore} = useStore();
  const {listData} = mineStore;
  const {requestMineData} = mineStore;
  const [imgHeight, setImgHeight] = useState(400);
  const [list, setList] = useState<ArticleSimple[]>([]);
  //弹框实例
  const mineSlider = useRef<MessageModalInstance>();

  useEffect(() => {
    requestMineData();
  }, [requestMineData]);

  useEffect(() => {
    if (isObject<ArticleSimple>(listData) && !!listData.collectionList.length) {
      setList(listData.collectionList);
    }
  }, [listData.collectionList]);

  const btnListData = useMemo(() => {
    return ['笔记', '收藏', '赞过'];
  }, []);

  const handleOnLayout = useCallback((e: LayoutChangeEvent) => {
    const {height} = e.nativeEvent.layout;
    setImgHeight(height);
  }, []);

  const handleTabChange = useCallback(
    (index: number) => {
      switch (index) {
        case 0:
          if (listData.noteList.length) setList([...listData['noteList']]);
          break;
        case 1:
          if (listData.collectionList) setList([...listData['collectionList']]);
          break;
        case 2:
          if (listData.favorateList) setList([...listData['favorateList']]);
          break;
      }
    },
    [
      listData.noteList,
      listData.collectionList,
      listData.favorateList,
      setList,
    ],
  );

  const handleDetialPress = useCallback(
    (id: number) => {
      navigation.push('ArticleDetials', {id});
    },
    [navigation],
  );

  const hanldeMenuCb = useCallback(() => {
    mineSlider.current?.showModal();
  }, [mineSlider.current]);

  return (
    <View style={styles.container}>
      <Image
        source={IconMenuBg}
        style={[styles.mineBg, {height: imgHeight + 64}]}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={mineStore.refreshing}
            onRefresh={mineStore.requestMineData}
          />
        }>
        <MineNav menuCb={hanldeMenuCb} />
        <MineInfo layoutCb={handleOnLayout} />
        <NavTabs
          btnListData={btnListData}
          style={styles.tabs}
          tabChangeCb={handleTabChange}
        />
        <View style={styles.listContainer}>
          {!!list.length &&
            list.map((item, index) => {
              return (
                <TouchableOpacity
                  key={`${item.id}-${index}`}
                  style={styles.item}
                  onPress={e => handleDetialPress(item.id)}>
                  <Image style={styles.itemImg} source={{uri: item.image}} />
                  <Text style={styles.titleTxt}>{item.title}</Text>
                  <View style={styles.nameLayout}>
                    <Image
                      style={styles.avatarImg}
                      source={{uri: item.avatarUrl}}
                    />
                    <Text style={styles.nameTxt}>{item.userName}</Text>
                    <HeartIcon defaultValue={item.isFavorite} />
                    <Text style={styles.countTxt}>{item.favoriteCount}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
      <MineSlider ref={mineSlider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
  },
  mineBg: {
    width: '100%',
    height: 800,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  mineScrollBox: {},
  tabs: {
    height: 48,
    backgroundColor: 'white',
    paddingHorizontal: 96,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  mineList: {
    flex: 1,
    backgroundColor: 'red',
  },
  listContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
  },
  item: {
    width: (SCREEN_WIDTH - 18) >> 1,
    backgroundColor: 'white',
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
  },
  titleTxt: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 10,
    marginVertical: 4,
  },
  nameLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  avatarImg: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  nameTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
    flex: 1,
  },
  heart: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  countTxt: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  itemImg: {
    width: (SCREEN_WIDTH - 18) >> 1,
    height: 240,
  },
});

export default memo(observer(Mine));
