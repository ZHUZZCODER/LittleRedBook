import React, {memo, useState, forwardRef, useImperativeHandle} from 'react';
import type {FC, ReactNode} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import IconGroup from '@/assets/images/icon_group.png';
import IconCreateGroup from '@/assets/images/icon_create_group.png';

interface IProps {
  children?: ReactNode;
}

export type MessageModalInstance = {
  showModal(yPosition: number): void;
  hideModal(): void;
};

const MessageModal = forwardRef<MessageModalInstance, IProps>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  //设置内容位置
  const [yLocation, setYLocation] = useState<number>(100);

  useImperativeHandle(ref, () => ({
    showModal,
    hideModal,
  }));

  const showModal = (yPosition: number) => {
    setYLocation(yPosition);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      //是否位于状态栏下方
      statusBarTranslucent={true}
      //动画类型
      animationType="fade"
      //手势关闭
      onRequestClose={hideModal}>
      <TouchableOpacity onPress={hideModal} style={styles.container}>
        <View style={[styles.modalContent, {top: yLocation}]}>
          <TouchableOpacity style={styles.menuBox}>
            <Image source={IconGroup} style={styles.iconImg} />
            <Text>群聊广场</Text>
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity style={styles.menuBox}>
            <Image source={IconCreateGroup} style={styles.iconImg} />
            <Text>创建群聊</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000040',
  },
  modalContent: {
    width: 170,
    height: 112,
    backgroundColor: 'white',
    borderRadius: 16,
    position: 'absolute',
    right: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
  },
  menuBox: {
    flexDirection: 'row',
  },
  iconImg: {
    width: 28,
    height: 28,
  },
  line: {
    height: 1,
    backgroundColor: '#eee',
  },
});

export default memo(MessageModal);
