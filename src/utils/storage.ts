import AsyncStorage from '@react-native-async-storage/async-storage';
import {isString} from './type';
import Storage from 'react-native-storage';

class LocalStorage {
  getCache(key: string) {
    let value = AsyncStorage.getItem(key);
    if (isString(value) && value !== 'undefined') {
      return JSON.parse(value);
    } else {
      return value;
    }
  }

  setCache(key: string, val: unknown) {
    AsyncStorage.setItem(key, JSON.stringify(val));
  }

  removeCache(key: string) {
    return AsyncStorage.removeItem(key);
  }

  clearCache() {
    return AsyncStorage.clear();
  }
}

export default new LocalStorage();
