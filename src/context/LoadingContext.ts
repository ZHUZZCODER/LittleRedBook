import {createContext} from 'react';
import type {TextStyle} from 'react-native';
export interface SpinnerState {
  visible: boolean;
  textContent: string;
  textStyle: TextStyle;
}

const LoadingContext = createContext<SpinnerState | {}>({});

export {LoadingContext};
