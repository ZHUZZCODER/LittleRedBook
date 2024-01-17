import React, {memo, useState, Fragment} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import type {TextStyle} from 'react-native';
import {LoadingContext} from '@/context';
import type {SpinnerState} from '@/context';
import Spinner from 'react-native-loading-spinner-overlay';

import type {SpinnerPropTypes} from 'react-native-loading-spinner-overlay';

interface IProps {
  children?: ReactNode;
}

interface GlobalLoadingOptions {
  show(options?: SpinnerState): void;
  hide(): void;
}

export let GlobalLoading: GlobalLoadingOptions;

const LoadingProvider: FC<IProps> = props => {
  const {children} = props;
  const [spinnerState, setSpinnerState] = useState<SpinnerState | {}>({
    visible: false,
    textStyle: styles.loadingTextStyle,
  });

  const show = (options?: SpinnerState) => {
    const spinnerOptions = {
      ...spinnerState,
      visible: true,
      textContent: 'Loading...',
      ...options,
    };
    setSpinnerState(spinnerOptions);
  };

  const hide = () => {
    const spinnerOptions = {
      ...spinnerState,
      visible: false,
    };
    setSpinnerState(spinnerOptions);
  };

  GlobalLoading = {
    show,
    hide,
  };

  return (
    <LoadingContext.Provider value={spinnerState}>
      {children}
      <Spinner {...spinnerState} />
    </LoadingContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {},
  loadingTextStyle: {
    color: '#FFF',
  },
});

export default memo(LoadingProvider);
