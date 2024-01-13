import {makeAutoObservable} from 'mobx';
import UserStore from './user';
import {createContext, useContext} from 'react';

class RootStore {
  userStore: UserStore;
  constructor() {
    this.userStore = new UserStore();
  }
}

const rootStore = new RootStore();
const context = createContext(rootStore);
const useStore = () => useContext(context);
export {useStore};
