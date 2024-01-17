import React, {memo} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface IProps {
  children?: ReactNode;
  navTitle: string;
  subTitle: string;
}

const ChannelNav: FC<IProps> = ({navTitle, subTitle, children}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.navTitleTx}>{navTitle}</Text>
      <Text style={styles.subTitleTx}>{subTitle}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  navTitleTx: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 16,
  },
  subTitleTx: {
    fontSize: 13,
    color: '#999',
    marginLeft: 12,
    flex: 1,
  },
});

export default memo(ChannelNav);
