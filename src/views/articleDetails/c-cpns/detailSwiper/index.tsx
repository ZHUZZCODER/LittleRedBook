import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';

import {any} from 'underscore';

interface IProps {
  children?: ReactNode;
  imageList: string[];
}

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const DetailSwiper: FC<IProps> = props => {
  const {imageList} = props;
  const [imgHeight, setImgHeight] = useState<number>(400);
  //当前索引
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  //总page
  const totalImage = useMemo(() => {
    return !!imageList.length ? imageList.length : 0;
  }, [imageList]);

  useEffect(() => {
    if (!!imageList.length) {
      Image.getSize(imageList[0], (width: number, height: number) => {
        const computedImgHeight = (SCREEN_WIDTH * height) / width;
        setImgHeight(computedImgHeight);
      });
    }
  }, [imageList]);

  const handleIndexChanged = useCallback(
    (index: number) => {
      setCurrentIndex(index + 1);
    },
    [setCurrentIndex],
  );

  return (
    <View>
      <Swiper
        containerStyle={styles.swiperContainer}
        height={550}
        paginationStyle={styles.paginationStyle}
        dotColor={'#eee'}
        activeDotColor="#ff2442"
        onIndexChanged={handleIndexChanged}
        loop={false}>
        {imageList.map((img, index) => {
          return (
            <View key={index}>
              <Image src={img} style={[styles.img, {height: imgHeight}]} />
            </View>
          );
        })}
      </Swiper>
      <Text style={styles.indexBox}>{`${currentIndex}/${totalImage}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 550,
  },
  swiperContainer: {
    paddingBottom: 30,
    backgroundColor: 'white',
  },
  img: {
    width: '100%',
  },
  paginationStyle: {
    position: 'relative',
    top: 5,
  },
  indexBox: {
    width: 35,
    height: 25,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
    color: '#fff',
    backgroundColor: '#333333',
    position: 'absolute',
    top: 15,
    right: 15,
  },
});

export default memo(DetailSwiper);
