import React, {memo} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface IProps {
  children?: ReactNode;
}

const Shop: FC<IProps> = props => {
  return (
    <View style={styles.container}>
      <Text>Shop</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default memo(Shop);
