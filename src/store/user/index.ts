import {makeAutoObservable} from 'mobx';
import {userLogin} from '@/services';
import localStorage from '@/utils/storage';
import {ToastShow} from '@/utils/Toast';

interface UserInfo {
  name: string;
  avatar: string;
  desc: string;
  sex: string;
  redBookId: number;
  location: string;
  nickName: string;
}

export default class UserStore {
  userInfo: UserInfo | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  changeUserInfo(name: string, pwd: string): Promise<unknown> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await userLogin({name, pwd});
        if (result) {
          // console.log('result=', result);
          this.userInfo = result;
          localStorage.setCache('userInfo', this.userInfo);
          ToastShow('登录成功!');
          resolve(true);
        } else {
          ToastShow('登录失败!');
          reject();
        }
      } catch (error) {
        ToastShow('登录失败!');
        reject(error);
      }
    });
  }
}
