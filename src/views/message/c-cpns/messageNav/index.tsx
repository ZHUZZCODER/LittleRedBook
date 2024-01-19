import React, {memo, useCallback} from 'react';
import type {FC, ReactNode} from 'react';
import type {GestureResponderEvent} from 'react-native';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import IconGroup from '@/assets/images/icon_group.png';

interface IProps {
  children?: ReactNode;
  messageGroupFn: (e: GestureResponderEvent) => void;
}

const Demo: FC<IProps> = props => {
  const {messageGroupFn} = props;
  const handleMessageGroupPress = useCallback(
    (e: GestureResponderEvent) => {
      messageGroupFn(e);
    },
    [messageGroupFn],
  );
  return (
    <View style={styles.container}>
      <View style={styles.leftBar}></View>
      <View style={styles.centerBar}>
        <Text style={styles.centerTx}>消息</Text>
      </View>
      <TouchableOpacity
        onPress={handleMessageGroupPress}
        style={styles.rightBar}>
        <Image source={IconGroup} style={styles.groupIcon} />
        <Text style={styles.groupTx}>群聊</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 48,
  },
  leftBar: {
    width: 70,
  },
  centerBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerTx: {
    fontSize: 18,
    color: '#333',
  },
  rightBar: {
    width: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupIcon: {
    width: 16,
    height: 16,
  },
  groupTx: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
    position: 'relative',
    top: -1,
  },
});

export default memo(Demo);
