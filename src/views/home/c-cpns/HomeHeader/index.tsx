import React, {memo, useMemo, useState, useEffect} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import IconDaily from '@/assets/images/icon_daily.png';
import IconSearch from '@/assets/images/icon_search.png';
import NavTabs from '@/components/NavTabs';

interface IProps {
  children?: ReactNode;
  //header点击回调
  onHeaderPressChange?: (index: number) => void;
  //初始化index
  initIndex?: number;
}

const HomeHeader: FC<IProps> = ({onHeaderPressChange, initIndex = 1}) => {
  const btnListData = useMemo(() => {
    return ['关注', '发现', '南京'];
  }, []);
  //活跃状态
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    setActiveIndex(initIndex);
  }, [initIndex]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.barContainer}>
        <Image source={IconDaily} style={styles.barIcon} />
      </TouchableOpacity>
      <NavTabs
        btnListData={btnListData}
        tabChangeCb={onHeaderPressChange}
        style={{flex: 1}}
      />
      <TouchableOpacity style={styles.barContainer}>
        <Image source={IconSearch} style={styles.barIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: 'white',
  },
  barIcon: {
    width: 28,
    height: 28,
  },
  barContainer: {
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  centerBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
    paddingHorizontal: 42,
  },
  headerTitle: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  normalHeaderTitle: {
    fontSize: 16,
    color: '#999',
  },
  activeHeaderTitle: {
    fontSize: 17,
    color: '#333',
  },
  line: {
    width: 28,
    height: 2,
    backgroundColor: '#ff2442',
    borderRadius: 1,
    position: 'absolute',
    bottom: 6,
  },
});

export default memo(HomeHeader);
