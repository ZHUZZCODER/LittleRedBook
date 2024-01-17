import {createContext, useContext} from 'react';
import UserStore from './user';
import HomeStore from './home';
import ArticleDetials from './articleDetails';
class RootStore {
  userStore: UserStore;
  homeStore: HomeStore;
  articleDetials: ArticleDetials;
  constructor() {
    this.userStore = new UserStore();
    this.homeStore = new HomeStore();
    this.articleDetials = new ArticleDetials();
  }
}

const rootStore = new RootStore();
const context = createContext(rootStore);
const useStore = () => useContext(context);
export {useStore};
