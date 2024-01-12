import React, {
  memo,
  useCallback,
  useState,
  useMemo,
  useRef,
  ElementRef,
} from 'react';
import type {FC, ReactNode} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TouchableRadio from '@/components/TouchableRadio';
import {
  formatPhone,
  verifyPhone,
  verifyPassword,
  replaceBlank,
} from '@/utils/utils';
import type {StackScreenNavigationProp} from '@/router';
import IconQq from '@/assets/images/icon_qq.webp';
import IconWx from '@/assets/images/icon_wx.png';
import IconExchange from '@/assets/images/icon_exchange.png';
import IconEyeOpen from '@/assets/images/icon_eye_open.png';
import IconEyeClose from '@/assets/images/icon_eye_close.png';
import IconTriangle from '@/assets/images/icon_triangle.png';
import IconCloseModal from '@/assets/images/icon_close_modal.png';

interface IProps {
  children?: ReactNode;
  changeLoginWay: (loginWay: boolean) => void;
}

const OtherLogin: FC<IProps> = props => {
  const {changeLoginWay} = props;
  const navigation = useNavigation<StackScreenNavigationProp>();

  //显示隐藏密码
  const [showPassword, setShowPassword] = useState(false);
  //获取选中框实例
  const selectedRef = useRef<{getIconSelected(): boolean} | null>(null);

  //用户登录用户名和密码
  const [accountPassword, setAccountPassword] = useState<{
    account: string;
    password: string;
  }>({
    account: '',
    password: '',
  });

  const [account, setAccount] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  //关闭其他登录
  const handleCloseOtherLogin = useCallback(() => {
    changeLoginWay(false);
  }, [changeLoginWay]);

  //显示隐藏密码
  const handleShowHidePassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [setShowPassword, showPassword]);

  //密码图片
  const passwordIcon = useMemo(() => {
    return !showPassword ? IconEyeClose : IconEyeOpen;
  }, [showPassword]);

  //account输入
  const handleChangeTextAccount = useCallback(
    (text: string) => {
      setAccount(formatPhone(text));
    },
    [account, setAccount],
  );

  //password输入
  const handleChangeTextPassword = useCallback(
    (text: string) => {
      setPassword(text);
    },
    [password, setPassword],
  );

  //处理登录
  const handleLogin = useCallback(() => {
    const isSelected = selectedRef.current?.getIconSelected();
    let accountNum = replaceBlank(account);
    if (!verifyPhone(accountNum) || !verifyPassword(password) || !isSelected)
      return;
    //跳转主页

    navigation.replace('Home');
  }, [account, password, selectedRef]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeImageBox}
        onPress={handleCloseOtherLogin}>
        <Image source={IconCloseModal} style={styles.closeIcon} />
      </TouchableOpacity>
      <View style={styles.loginHeader}>
        <Text style={styles.headerTx}>密码登录</Text>
        <Text style={styles.headerDesc}>
          未注册的手机号登录成功后将自动注册
        </Text>
      </View>
      <View style={styles.InputBox}>
        <Text style={styles.phonePrefix}>+86</Text>
        <Image source={IconTriangle} style={styles.phonePrefixIcon} />
        <TextInput
          maxLength={13}
          placeholder="请输入手机号码"
          keyboardType="number-pad"
          placeholderTextColor="#bbb"
          value={account}
          onChangeText={handleChangeTextAccount}
          style={styles.phoneInput}
        />
      </View>
      <View style={styles.InputBox}>
        <TextInput
          maxLength={6}
          placeholder={'输入密码'}
          placeholderTextColor={'#bbb'}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={handleChangeTextPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={handleShowHidePassword}>
          <Image style={styles.passwordIcon} source={passwordIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.loginWays}>
        <TouchableOpacity style={styles.authCodeLogin}>
          <Image style={styles.authCodeImage} source={IconExchange} />
          <Text style={styles.loginWayTx}>验证码登录</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.loginWayTx}>忘记密码？</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleLogin}
        style={[styles.loginBtnActive, styles.loginBtnNormal]}>
        <Text style={styles.loginBtnTx}>登录</Text>
      </TouchableOpacity>
      <View style={styles.agreementBox}>
        <TouchableRadio ref={selectedRef} />
        <Text style={styles.meAgreeTx}>
          我已阅读并同意
          <Text style={styles.protocolTxt}>
            {'《用户协议》《隐私政策》\n《儿童/青少年个人信息保护规则》'}
          </Text>
        </Text>
      </View>
      <View style={styles.loginIconBox}>
        <TouchableOpacity>
          <Image style={styles.loginIcon} source={IconWx} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.loginIcon} source={IconQq} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 48,
    backgroundColor: 'white',
  },
  closeImageBox: {
    position: 'absolute',
    left: 36,
    top: 24,
  },
  closeIcon: {
    width: 28,
    height: 28,
  },
  loginHeader: {
    alignItems: 'center',
  },
  headerTx: {
    fontSize: 28,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 56,
  },
  headerDesc: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 6,
  },
  phonePrefix: {
    fontSize: 24,
    color: '#bbb',
  },
  phonePrefixIcon: {
    width: 12,
    height: 6,
    marginLeft: 6,
  },
  phoneInput: {
    flex: 1,
    height: 60,
    fontSize: 24,
    color: '#333',
    marginLeft: 16,
  },
  InputBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  passwordInput: {
    flex: 1,
    height: 60,
    fontSize: 24,
    marginRight: 16,
  },
  passwordIcon: {
    width: 30,
    height: 30,
  },
  loginWays: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  authCodeLogin: {
    flexDirection: 'row',
  },
  authCodeImage: {
    width: 16,
    height: 16,
    marginRight: 4,
    marginTop: 3,
  },
  loginWayTx: {
    fontSize: 14,
    color: '#303080',
  },
  loginBtnActive: {
    width: '100%',
    height: 56,
    backgroundColor: '#ff2442',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
    marginTop: 20,
  },
  loginBtnNormal: {
    backgroundColor: '#DDDDDD',
  },
  loginBtnTx: {
    fontSize: 20,
  },
  agreementBox: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 40,
  },
  meAgreeTx: {
    fontSize: 12,
    color: '#999',
  },
  protocolTxt: {
    fontSize: 12,
    color: '#1020ff',
  },
  loginIconBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
  },
  loginIcon: {
    width: 50,
    height: 50,
  },
});

export default memo(OtherLogin);
