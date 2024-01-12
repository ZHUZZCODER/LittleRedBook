import React, {
  memo,
  useCallback,
  useState,
  forwardRef,
  useImperativeHandle,
  ElementRef,
} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import IconUnselected from '@/assets/images/icon_unselected.png';
import IconSelected from '@/assets/images/icon_selected.png';

interface IProps {
  children?: ReactNode;
}

const TouchableRadio = forwardRef<{getIconSelected(): boolean}, IProps>(
  (props, ref) => {
    const [isIconSelected, setIsIconSelected] = useState<boolean>(false);

    useImperativeHandle(ref, () => {
      return {
        getIconSelected() {
          return isIconSelected;
        },
      };
    });

    //同意协议选择
    const handleIconSelect = useCallback(() => {
      setIsIconSelected(!isIconSelected);
    }, [setIsIconSelected, isIconSelected]);
    return (
      <TouchableOpacity onPress={handleIconSelect}>
        <Image
          style={styles.agreeIcon}
          source={isIconSelected ? IconSelected : IconUnselected}
        />
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  agreeIcon: {
    width: 20,
    height: 20,
  },
});

export default memo(TouchableRadio);
