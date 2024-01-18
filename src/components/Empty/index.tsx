import React, {memo} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

interface IProps {
  children?: ReactNode;
  emptyData: {
    icon: number;
    tips: string;
  };
}

const Empty: FC<IProps> = props => {
  const {
    emptyData: {icon, tips},
  } = props;

  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.tipsTxt}>{tips}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 120,
  },
  icon: {
    width: 96,
    height: 96,
    resizeMode: 'contain',
  },
  tipsTxt: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 16,
  },
});

export default memo(Empty);
