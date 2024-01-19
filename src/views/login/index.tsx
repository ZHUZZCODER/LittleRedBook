import React, {memo, useCallback, useState} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import QuickLogin from './c-cpns/quickLogin';
import OtherLogin from './c-cpns/otherLogin';

interface IProps {
  children?: ReactNode;
}

const Login: FC<IProps> = props => {
  const [loginWay, setLoginWay] = useState<boolean>(true);

  const handleChangeLoginWay = useCallback(
    (loginWay: boolean) => {
      setLoginWay(!loginWay);
    },
    [setLoginWay],
  );

  return (
    <View style={styles.container}>
      {loginWay ? (
        <QuickLogin loginWay={loginWay} changeLoginWay={handleChangeLoginWay} />
      ) : (
        <OtherLogin changeLoginWay={handleChangeLoginWay} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
  },
});

export default memo(Login);
