import {ParamListBase} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Home: undefined;
};

export type StackScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;
