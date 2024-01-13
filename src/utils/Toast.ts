import {ToastAndroid} from 'react-native';

type ToastDuration = ToastAndroid['SHORT'] | ToastAndroid['LONG'];

export const ToastShow = (
  msg: string,
  duration: ToastDuration = ToastAndroid.SHORT,
) => {
  ToastAndroid.show(msg, duration);
};
