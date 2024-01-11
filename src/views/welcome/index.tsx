import React, {memo} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {API_URL} from '@/config';

interface IProps {
  children?: ReactNode;
}

const Welcome: FC<IProps> = props => {
  return (
    <View style={styles.container}>
      <Text>Welcome1{API_URL}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default memo(Welcome);
