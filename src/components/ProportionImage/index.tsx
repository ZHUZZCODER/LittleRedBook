import React, {memo, useEffect, useState, useRef, useMemo} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';

interface IProps {
  children?: ReactNode;
  src: string;
  //列数
  columnNum?: number;
  //间距
  columnGap?: number;
}

const {width: ScreenWidth} = Dimensions.get('window');
// const initImageWidth = (ScreenWidth - 18) >> 1;

const ProportionImage: FC<IProps> = ({src, columnNum = 2, columnGap = 6}) => {
  const initImageWidth = (ScreenWidth - columnNum * columnGap) / 2;
  const [imageHeight, setImageHeight] = useState<number>(200);
  useEffect(() => {
    Image.getSize(src, (width: number, height: number) => {
      const computedImageHeight = (initImageWidth * height) / width;
      setImageHeight(computedImageHeight);
    });
  }, [src]);
  const styles = StyleSheet.create({
    container: {
      width: initImageWidth,
      height: imageHeight,
      resizeMode: 'cover',
    },
  });
  return <Image source={{uri: src}} style={styles.container} />;
};

export default memo(ProportionImage);
