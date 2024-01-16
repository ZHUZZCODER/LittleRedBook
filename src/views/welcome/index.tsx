import React, {memo, useCallback} from 'react';
import {FC, ReactNode, useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackScreenNavigationProp} from '@/router';
import localStorage from '@/utils/storage';
import IconMainLogo from '@/assets/images/icon_main_logo.png';
import {isEmptyObject} from '@/utils/utils';

interface IProps {
  children?: ReactNode;
}

const Welcome: FC<IProps> = props => {
  const naviagtion = useNavigation<StackScreenNavigationProp>();

  //判断是否登录
  const handleJumpTo = useCallback(async () => {
    const userInfo = await localStorage.getCache('userInfo');
    if (userInfo && isEmptyObject(userInfo)) {
      naviagtion.replace('MainHome');
    } else {
      naviagtion.replace('Login');
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      handleJumpTo();
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
