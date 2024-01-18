import {createContext, useContext} from 'react';
import UserStore from './user';
import HomeStore from './home';
import ArticleDetials from './articleDetails';
import ShopStore from './shop';
class RootStore {
  userStore: UserStore;
  homeStore: HomeStore;
  articleDetials: ArticleDetials;
  shopStore: ShopStore;
  constructor() {
    this.userStore = new UserStore();
    this.homeStore = new HomeStore();
    this.articleDetials = new ArticleDetials();
    this.shopStore = new ShopStore();
  }
}

const rootStore = new RootStore();
const context = createContext(rootStore);
const useStore = () => useContext(context);
export {useStore};
