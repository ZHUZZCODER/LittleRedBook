import React, {memo, useEffect, useState} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {isDefined} from '@/utils/type';
import {PlanObject} from '@/type/base';

interface IProps {
  children?: ReactNode;
  //数据源
  btnListData: string[];
  //初始活跃状态
  initActiveIndex?: number;
  tabChangeCb?: (index: number, title?: string) => void;
  style?: PlanObject;
}

const NavTabs: FC<IProps> = props => {
  const {btnListData, initActiveIndex, tabChangeCb, style = {}} = props;

  //活跃状态
  const [activeIndex, setActiveIndex] = useState(1);

  const flattenStyle = StyleSheet.flatten<PlanObject>([
    styles.container,
    style,
  ]);

  useEffect(() => {
    if (isDefined(initActiveIndex)) {
      setActiveIndex(initActiveIndex!);
    }
  }, [initActiveIndex]);

  return (
    <View style={flattenStyle}>
      {btnListData.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <TouchableOpacity
            key={item}
            onPress={() => {
              setActiveIndex(index);
              tabChangeCb?.(index);
            }}
            style={styles.headerTitle}>
            <Text
              style={[
                styles.normalHeaderTitle,
                isActive ? styles.activeHeaderTitle : {},
              ]}>
              {item}
            </Text>
            {isActive && <View style={styles.line}></View>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default memo(NavTabs);
