import {makeAutoObservable, runInAction} from 'mobx';
import {getHomeList} from '@/services';
import {DEFAULT_CATEGORY_LIST} from '@/assets/data/categoryListData';
import LocalStorage from '@/utils/storage';
import type {HomeListParams} from '@/services';

export interface HomeList {
  userName: string;
  avatarUrl: string;
  title: string;
  image: string;
  message: string;
  dateTime: string;
  location: string;
  favoriteCount: number;
  isFavorite: boolean;
  children?: HomeList[];
}

export interface Category {
  name: string;
  default: boolean;
  isAdd: boolean;
}

export default class HomeStore {
  homeList: HomeList[] = [];
  pageIndex: number = 1;
  //刷新
  refreshing: boolean = false;
  isEnd: boolean = false;
  //分类数据
  categoryList: Category[] = [];
  //是否设置
  isSetting: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  async requestChangeHomeList() {
    if (this.refreshing || this.isEnd) return;
    this.refreshing = true;
    try {
      const result = await getHomeList({page: this.pageIndex, size: 10});
      if (result && !!result.length) {
        runInAction(() => {
          if (this.pageIndex === 1) {
            this.homeList = result;
          } else {
            this.homeList = this.homeList.concat(result);
          }
          this.pageIndex = ++this.pageIndex;
        });
      } else {
        //没有数据了
        runInAction(() => {
          this.isEnd = true;
          this.pageIndex = this.pageIndex - 1;
        });
      }
    } catch (error) {
    } finally {
      runInAction(() => {
        this.refreshing = false;
      });
    }
  }

  //重置page
  resetPageIndex() {
    this.pageIndex = 1;
    this.isEnd = false;
    this.requestChangeHomeList();
  }

  //修改categoryList
  async changeCategoryList() {
    const categoryList = await LocalStorage.getCache('categoryList');
    if (categoryList && categoryList.length) {
      runInAction(() => {
        this.categoryList = categoryList;
      });
    } else {
      runInAction(() => {
        this.categoryList = DEFAULT_CATEGORY_LIST;
      });
    }
  }

  changeCategoryData(categoryList: Category[]) {
    this.categoryList = categoryList;
  }

  changeIsSetting(status: boolean) {
    this.isSetting = status;
  }

  get getIsSetting() {
    return this.isSetting;
  }
}
