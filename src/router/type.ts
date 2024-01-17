import {ParamListBase} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {
  CompositeScreenProps,
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/native';
import type {
  BottomTabScreenProps,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import type {
  StackScreenProps,
  StackNavigationProp,
} from '@react-navigation/stack';

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  MainHome: undefined;
  ArticleDetials: {
    id: number;
  };
};

type RootTabParamList = {
  Home: undefined;
  Shop: undefined;
  Message: undefined;
  Mine: undefined;
};

export type StackScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;

//useNavigation类型
export type NavigationScreenProps = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, keyof RootTabParamList>,
  StackNavigationProp<RootStackParamList, keyof RootStackParamList>
>;

//props类型
export type NavigationScreenProp = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, keyof RootTabParamList>,
  StackScreenProps<RootStackParamList>
>;

//route类型
export type NavigationScreenRoute = RouteProp<
  RootStackParamList & RootTabParamList,
  keyof RootStackParamList | keyof RootTabParamList
>;
