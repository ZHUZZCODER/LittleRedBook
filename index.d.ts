declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL: string;
  }
  export const Config: NativeConfig;
  export default Config;
}

// declare namespace GlobalLoading {
//   interface SpinnerState {
//     visible: boolean;
//     textContent: string;
//     textStyle: TextStyle;
//   }
//   function show(options?: SpinnerState) {}
//   function hide() {}
// }

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.webp';
