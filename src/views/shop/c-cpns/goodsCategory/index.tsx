import React, {memo} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import type {GoodsCategory} from '@/store/shop';

interface IProps {
  children?: ReactNode;
  goodsCategoryList: Omit<GoodsCategory, 'name'>[];
}

const GoodsCategory: FC<IProps> = props => {
  const {goodsCategoryList} = props;
  return (
    <View style={styles.container}>
      {goodsCategoryList.map(({id, image}) => {
        return (
          <View key={id} style={styles.categoryImgBox}>
            <Image src={image} style={styles.categoryImg} />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
  },
  categoryImgBox: {
    width: '20%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default memo(GoodsCategory);
