import {makeAutoObservable} from 'mobx';
import {createContext, useContext} from 'react';
import UserStore from './user';
import HomeStore from './home';
class RootStore {
  userStore: UserStore;
  homeStore: HomeStore;
  constructor() {
    this.userStore = new UserStore();
    this.homeStore = new HomeStore();
  }
}

const rootStore = new RootStore();
const context = createContext(rootStore);
const useStore = () => useContext(context);
export {useStore};
