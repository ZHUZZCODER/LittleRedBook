import React, {memo} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface IProps {
  children?: ReactNode;
  count: number;
}

const LogoCount: FC<IProps> = props => {
  const {count} = props;

  return <Text style={styles.container}>{count}</Text>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    paddingVertical: 0.5,
    backgroundColor: '#ff2442',
    borderRadius: 12,
    color: 'white',
    position: 'absolute',
    top: -6,
    right: -10,
  },
});

export default memo(LogoCount);
