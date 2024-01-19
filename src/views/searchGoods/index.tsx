import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  ElementRef,
} from 'react';
import type {FC, ReactNode} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
  StatusBar,
} from 'react-native';
import IconArrow from '@/assets/images/icon_arrow.png';
import IconSearch from '@/assets/images/icon_search.png';
import type {NavigationScreenProps} from '@/router';
import {useNavigation} from '@react-navigation/native';

interface IProps {
  children?: ReactNode;
}

const SearchGoods: FC<IProps> = props => {
  const navigation = useNavigation<NavigationScreenProps>();
  //是否显示返回按钮
  const [showBack, setShowBack] = useState<boolean>(false);
  //input实例
  const inputInstance = useRef<TextInput>(null);

  //***进入搜索页面添加动画效果
  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      setShowBack(true);
      //进入聚焦
      inputInstance.current?.focus();
    }, 100);
  }, []);

  const handleBackPress = useCallback(() => {
    //***离开动画 */
    LayoutAnimation.easeInEaseOut();
    setShowBack(false);
    inputInstance.current?.blur();
    setTimeout(() => {
      navigation.pop();
    }, 300);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backBtn}>
        <Image source={IconArrow} style={styles.backImg} />
      </TouchableOpacity>
      <View style={styles.searchBox}>
        <Image source={IconSearch} style={styles.searchIcon} />
        <TextInput ref={inputInstance} style={styles.searchTx} />
      </View>
      <Text style={styles.searchBtn}>搜索</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    height: '100%',
    paddingLeft: 16,
    justifyContent: 'center',
  },
  backImg: {
    width: 20,
    height: 20,
  },
  searchBox: {
    height: 32,
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginLeft: 16,
  },
  searchIcon: {
    width: 18,
    height: 18,
  },
  searchTx: {
    fontSize: 14,
    color: '#bbb',
    marginLeft: 6,
    paddingHorizontal: 8,
    paddingVertical: 0,
  },
  searchBtn: {
    fontSize: 16,
    color: '#666',
    marginHorizontal: 12,
  },
});

export default memo(SearchGoods);
