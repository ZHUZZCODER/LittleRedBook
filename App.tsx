/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationStack} from '@/router';
//集成Android和ios都支持的Toast
import {ToastProvider} from 'react-native-toast-notifications';
import LoadingProvider from '@/components/Loading';

function App(): React.JSX.Element {
  //状态栏颜色：dark-content： 黑 light-content： '白'

  return (
    <ToastProvider>
      <SafeAreaProvider>
        <LoadingProvider>
          <StatusBar
            translucent
            barStyle={'dark-content'}
            backgroundColor={'transparent'}
          />

          <NavigationStack />
        </LoadingProvider>
      </SafeAreaProvider>
    </ToastProvider>
  );
}

export default App;
