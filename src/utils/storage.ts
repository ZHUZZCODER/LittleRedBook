import AsyncStorage from '@react-native-async-storage/async-storage';
import {isString} from './type';

class LocalStorage {
  async getCache(key: string) {
    try {
      let value = await AsyncStorage.getItem(key);
      if (isString(value) && value !== 'undefined') {
        return JSON.parse(value);
      } else {
        return value;
      }
    } catch (error) {
      console.log('getItemError=', error);
    }
  }

  async setCache(key: string, val: unknown) {
    return AsyncStorage.setItem(key, JSON.stringify(val));
  }

  removeCache(key: string) {
    return AsyncStorage.removeItem(key);
  }

  clearCache() {
    return AsyncStorage.clear();
  }
}

export default new LocalStorage();
