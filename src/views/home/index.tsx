import React, {memo} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface IProps {
  children?: ReactNode;
}

const Home: FC<IProps> = props => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default memo(Home);
