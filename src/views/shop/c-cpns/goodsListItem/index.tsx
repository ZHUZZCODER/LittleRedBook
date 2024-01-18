import React, {memo} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text, Image, DimensionValue} from 'react-native';
import type {GoodsSimple} from '@/store/shop';
import type {PlanObject} from '@/type/base';

interface IProps {
  children?: ReactNode;
  goods: GoodsSimple;
  goodsWidth?: DimensionValue;
  style?: PlanObject;
}

const GoodsListItem: FC<IProps> = props => {
  const {
    goods: {image, title, price, promotion = '', originPrice = ''},
    goodsWidth = '25%',
    style = {},
  } = props;
  return (
    <View style={[styles.container, {width: goodsWidth}, style]}>
      <Image src={image} style={styles.goodsImg} />
      <View style={styles.textBox}>
        <Text style={styles.goodsTitle}>{title}</Text>
        {!!promotion && <Text>{promotion}</Text>}
        <Text style={styles.pricePrefix}>
          ￥
          <Text style={styles.priceTx}>
            {price} {!!originPrice && originPrice}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  goodsImg: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  textBox: {
    paddingHorizontal: 5,
  },
  goodsTitle: {
    fontSize: 14,
    color: '#333',
    marginTop: 6,
  },
  promotion: {
    width: 78,
    fontSize: 12,
    color: '#999',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#bbb',
    textAlign: 'center',
    marginTop: 4,
  },
  pricePrefix: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 4,
  },
  priceTx: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'justify',
  },
});

export default memo(GoodsListItem);
