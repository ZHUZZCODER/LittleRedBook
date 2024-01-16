//使用Android和ios都支持的Toast
import {Toast} from 'react-native-toast-notifications';
import type {ToastOptions} from 'react-native-toast-notifications';

export const ToastShow = (
  msg: string | JSX.Element,
  duration: ToastOptions['duration'] = 3000,
  placement: ToastOptions['placement'] = 'center',
  options: ToastOptions = {},
) => {
  Toast.show(msg, {
    duration,
    placement,
    type: 'normal',
    ...options,
  });
};
