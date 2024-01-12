import React, {memo, useState, useCallback} from 'react';
import type {FC, ReactNode} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import TouchableRadio from '@/components/TouchableRadio';
import IconMainLogo from '@/assets/images/icon_main_logo.png';
import IconArrow from '@/assets/images/icon_arrow.png';
import IconWxSmall from '@/assets/images/icon_wx_small.png';

interface IProps {
  children?: ReactNode;
  loginWay: boolean;
  changeLoginWay: (loginWay: boolean) => void;
}

const QuickLogin: FC<IProps> = props => {
  const {changeLoginWay, loginWay} = props;

  //用户协议跳转
  const handleUserAgreeMent = useCallback(() => {
    Linking.openURL('https://www.baidu.com/');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userAgreeMent}>
        <View style={styles.agreeMentBox}>
          <TouchableRadio />
          <Text style={styles.agreeTxt}>
            我已阅读并同意
            <Text style={styles.agreeMentTxt} onPress={handleUserAgreeMent}>
              {
                '《用户协议》和《隐私政策》《儿童/青\n少年个人信息保护规则》《中移动认证服务条款》'
              }
            </Text>
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.otherLoginMethod}
        onPress={e => changeLoginWay(loginWay)}>
        <Text style={styles.otherLoginTxt}>其他登录方式</Text>
        <Image style={styles.otherLoginIcon} source={IconArrow} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.wechatLoginBox} activeOpacity={0.7}>
        <Image style={styles.wechatIcon} source={IconWxSmall} />
        <Text style={styles.wechatBtnTx}>微信登录</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.onClickLogin} activeOpacity={0.7}>
        <Text style={styles.onClickTx}>一键登录</Text>
      </TouchableOpacity>
      <Image style={styles.logoMain} source={IconMainLogo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    paddingHorizontal: 56,
  },
  userAgreeMent: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },

  agreeMentBox: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  agreeTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
  },
  agreeMentTxt: {
    fontSize: 12,
    color: '#1020ff',
  },
  otherLoginMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 100,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  otherLoginTxt: {
    fontSize: 16,
    color: '#303080',
  },
  otherLoginIcon: {
    width: 16,
    height: 16,
    transform: [
      {
        rotate: '-180deg',
      },
    ],
    //保持一边拉伸
    resizeMode: 'contain',
    marginLeft: 6,
    marginTop: 3,
  },
  wechatLoginBox: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
    backgroundColor: '#05c160',
  },
  wechatIcon: {
    width: 40,
    height: 40,
  },
  wechatBtnTx: {
    fontSize: 18,
    color: 'white',
    marginLeft: 6,
  },
  onClickLogin: {
    width: '100%',
    height: 56,
    backgroundColor: '#ff2442',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  onClickTx: {
    fontSize: 18,
    color: 'white',
  },
  logoMain: {
    width: 180,
    height: 95,
    resizeMode: 'contain',
    position: 'absolute',
    top: 170,
  },
});

export default memo(QuickLogin);
