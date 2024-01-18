import LogoCount from '@/components/LogoCount';
import {observer} from 'mobx-react';
import React, {memo} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import type {ImageURISource} from 'react-native';

export type CountList = {
  name: string;
  count: number;
  icon: ImageURISource;
};

interface IProps {
  children?: ReactNode;
  countList: CountList[];
}

const CountNav: FC<IProps> = props => {
  const {countList} = props;
  return (
    <View style={styles.container}>
      {!!countList.length &&
        countList.map(({name, count, icon}) => {
          return (
            <View key={name} style={styles.countContainer}>
              <View style={styles.countBox}>
                <Image source={icon} style={styles.countImgBox} />
                <LogoCount count={count} />
              </View>
              <Text style={styles.nameDesc}>{name}</Text>
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 7,
  },
  countContainer: {},
  countBox: {
    width: 60,
  },
  countImgBox: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  nameDesc: {
    fontSize: 16,
    color: '#333',
    marginTop: 8,
  },
  logoCount: {},
});

export default memo(CountNav);
