import {Category} from '@/store/home';
import React, {memo, useCallback, useMemo} from 'react';
import type {FC, ReactNode} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  LayoutAnimation,
} from 'react-native';
import IconDelete from '@/assets/images/icon_delete.png';

interface IProps {
  children?: ReactNode;
  categroyList: Category[];
  //频道编辑显示
  isChannelEdit?: boolean;
  //频道添加显示
  isChannelAdd?: boolean;
  //编辑状态
  isEdit?: boolean;
  //处理编辑函数
  handleEidtFn?: (category: Category) => void;
}

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const CategoryBtnList: FC<IProps> = props => {
  const {
    categroyList,
    isChannelEdit = false,
    isChannelAdd = false,
    isEdit = false,
    handleEidtFn,
  } = props;
  const handleEidtPress = useCallback(
    (category: Category) => {
      handleEidtFn?.(category);
      //修改数据执行动画
      LayoutAnimation.easeInEaseOut();
    },
    [handleEidtFn],
  );
  return (
    <View style={styles.container}>
      {categroyList.map(category => {
        const {name, default: isDefault} = category;
        const isEditStatus = isChannelEdit && !isDefault && isEdit;
        return (
          <TouchableOpacity
            onPress={() => handleEidtPress(category)}
            key={name}
            style={[
              styles.channelBtn,
              isDefault ? styles.channelBtnDisabled : {},
            ]}>
            <Text>
              {isChannelAdd && '+ '}
              {name}
            </Text>
            {isEditStatus && (
              <Image source={IconDelete} style={styles.deleteIcon} />
            )}
          </TouchableOpacity>
        );
      })}
      <Text style={styles.hideBtn}></Text>
      <Text style={styles.hideBtn}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  channelBtn: {
    width: (SCREEN_WIDTH - 80) >> 2,
    height: 32,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  channelBtnDisabled: {
    borderWidth: 0,
    backgroundColor: '#eee',
  },
  hideBtn: {
    width: (SCREEN_WIDTH - 80) >> 2,
  },
  deleteIcon: {
    width: 16,
    height: 16,
    position: 'absolute',
    top: -6,
    right: -6,
  },
});

export default memo(CategoryBtnList);
