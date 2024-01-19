import React, {memo} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';

interface IProps {
  children?: ReactNode;
}

const Publish: FC<IProps> = props => {
  return (
    <View style={styles.container}>
      <Text>Publish</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
  },
});

export default memo(Publish);
