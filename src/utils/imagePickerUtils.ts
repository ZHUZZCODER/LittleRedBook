import {launchImageLibrary} from 'react-native-image-picker';
import type {ImageLibraryOptions, Callback} from 'react-native-image-picker';

//启动图库以选择图像或视频
export const getLaunchImageLibray = async (
  options?: ImageLibraryOptions,
  callback: Callback = () => {},
) => {
  return launchImageLibrary(
    {
      //媒体类型
      mediaType: 'photo',
      //照片质量
      quality: 1,
      //是否使用base64
      includeBase64: true,
      ...options,
    },
    callback,
  );
};
