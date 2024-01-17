/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationStack} from '@/router';
//集成Android和ios都支持的Toast
import {ToastProvider} from 'react-native-toast-notifications';
import LoadingProvider from '@/components/Loading';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ToastProvider>
      <SafeAreaProvider>
        <LoadingProvider>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={'white'}
          />

          <NavigationStack />
        </LoadingProvider>
      </SafeAreaProvider>
    </ToastProvider>
  );
}

export default App;
