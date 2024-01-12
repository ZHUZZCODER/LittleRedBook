import React, {memo} from 'react';
import {FC, ReactNode, useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '@/config';
import type {StackScreenNavigationProp} from '@/router';
import IconMainLogo from '@/assets/images/icon_main_logo.png';

interface IProps {
  children?: ReactNode;
}

const Welcome: FC<IProps> = props => {
  const naviagtion = useNavigation<StackScreenNavigationProp>();

  useEffect(() => {
    setTimeout(() => {
      naviagtion.replace('Login');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.iconMain} source={IconMainLogo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  iconMain: {
    width: 200,
    height: 105,
    marginTop: 200,
    //保持宽高比一边撑满
    resizeMode: 'contain',
  },
});

export default memo(Welcome);
