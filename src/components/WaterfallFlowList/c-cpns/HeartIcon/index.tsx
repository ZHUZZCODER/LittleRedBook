import React, {memo, useState, useEffect, useRef, useCallback} from 'react';
import type {FC, ReactNode} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import IconHeart from '@/assets/images/icon_heart.png';
import IconHeartEmpty from '@/assets/images/icon_heart_empty.png';

interface IProps {
  children?: ReactNode;
  defaultValue: boolean;
  onChangePress?: (status: boolean) => void;
  whSize?: number;
}

//点击特效
const HeartIcon: FC<IProps> = ({defaultValue, onChangePress, whSize = 20}) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  //scale动画
  const scale = useRef(new Animated.Value(0)).current;
  //opcity动画
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    setIsShow(defaultValue);
  }, [defaultValue]);

  const handleHeartIconPress = useCallback(() => {
    const showStatus = !isShow;
    setIsShow(showStatus);
    onChangePress?.(showStatus);
    if (showStatus) {
      opacity.setValue(1);
      const scaleAnimted = Animated.timing(scale, {
        toValue: 1.8,
        duration: 300,
        useNativeDriver: false,
      });
      const opacityAnimted = Animated.timing(opacity, {
        toValue: 0,
        duration: 400,
        delay: 200,
        useNativeDriver: false,
      });
      Animated.parallel([scaleAnimted, opacityAnimted]).start();
    } else {
      scale.setValue(0);
      opacity.setValue(0);
    }
  }, [onChangePress, isShow]);

  return (
    <TouchableOpacity onPress={handleHeartIconPress} style={styles.container}>
      <Image
        source={isShow ? IconHeart : IconHeartEmpty}
        style={[styles.heartIcon, {width: whSize, height: whSize}]}
      />
      <Animated.View
        style={{
          width: whSize,
          height: whSize,
          transform: [
            {
              scale: scale,
            },
          ],
          borderRadius: whSize / 2,
          borderWidth: whSize / 20,
          position: 'absolute',
          borderColor: '#ff2442',
          opacity,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  heartIcon: {
    resizeMode: 'contain',
  },
});

export default memo(HeartIcon);
