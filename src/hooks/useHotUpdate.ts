import {useCallback, useEffect} from 'react';
import {Alert, Platform} from 'react-native';
import {
  checkUpdate,
  downloadUpdate,
  isFirstTime,
  isRolledBack,
  markSuccess,
  onPushyEvents,
  switchVersion,
  switchVersionLater,
} from 'react-native-update';
import updateConfig from '../../update.json';
import type {PlanObject} from '@/type/base';
import type {UpdateAvailableResult} from 'react-native-update/lib/type';
const updateConfigData = updateConfig as PlanObject;
const {appKey} = updateConfigData[Platform.OS];
onPushyEvents(({type, data}) => {
  // 热更成功或报错的事件回调
  // 可上报自有或第三方数据统计服务
});

//热更新hooks
export default function useHotUpdate() {
  //处理应用更新
  const handleUpdate = useCallback(async (info: UpdateAvailableResult) => {
    try {
      const hash = await downloadUpdate(info, {
        onDownloadProgress({received, total}) {
          console.log('下载进度=', received, total);
        },
      });
      if (!hash) {
        Alert.alert('提示', '没有更新');
        return;
      }
      Alert.alert('提示', '下载完毕，是否重启应用？', [
        {
          text: '是',
          onPress: () => {
            switchVersion(hash);
          },
        },
        {
          text: '否',
        },
        {
          text: '下次启动时',
          onPress: () => {
            switchVersionLater(hash);
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert('更新失败', error.message);
    }
  }, []);
  //检查更新
  const checkApplicationUpdate = useCallback(async () => {
    if (__DEV__) {
      Alert.alert('应用不支持热更新!');
      return;
    }
    let info: UpdateAvailableResult;
    try {
      info = (await checkUpdate(appKey)) as UpdateAvailableResult;
    } catch (error: any) {
      Alert.alert('更新检查失败', error.message);
      return;
    }
    const metaInfo = JSON.parse(info.metaInfo) as {forceUpdate: boolean};
    if (metaInfo.forceUpdate) {
      Alert.alert('提示', '检测到forceUpdate');
    }
    if (info.expired) {
      Alert.alert('提示', '您的应用版本已更新');
    } else if (info.upToDate) {
      Alert.alert('提示', '您的应用版本已是最新.');
    } else if (info.update) {
      Alert.alert(
        '提示',
        '检查到新的版本' + info.name + ',是否下载?\n' + info.description,
        [
          {
            text: '是',
            onPress: () => {
              handleUpdate(info);
            },
          },
          {text: '否'},
        ],
      );
    }
  }, []);

  useEffect(() => {
    checkApplicationUpdate();
    if (isFirstTime) {
      markSuccess();
      Alert.alert('提示', '更新完成');
    } else if (isRolledBack) {
      Alert.alert('提示', '更新失败!');
    }
  }, []);
}
