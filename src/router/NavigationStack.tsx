import React, {memo} from 'react';
import type {FC, ReactNode} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '@/views/welcome';
import Login from '@/views/login';
// import Home from '@/views/home';
import NavigationTab from './NavigationTab';

interface IProps {
  children?: ReactNode;
}

const Stack = createNativeStackNavigator();

const NavigationStack: FC<IProps> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainHome"
          component={NavigationTab}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(NavigationStack);
