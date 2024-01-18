import {makeAutoObservable, runInAction} from 'mobx';
import {getGoodsList, getTop10Category} from '@/services';

export type GoodsSimple = {
  id: number;
  title: string;
  image: string;
  price: number;
  originPrice: number | undefined;
  promotion: string | undefined;
};

export type GoodsCategory = {
  id: number;
  name: string;
  image: string;
};

class ShopStore {
  page: number = 1;
  goodsList: GoodsSimple[] = [];
  goodsCategoryList: GoodsCategory[] = [];
  //刷新
  refreshing: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  resetPage() {
    this.page = 1;
  }

  async requestGoodsList() {
    if (this.refreshing) return;
    this.refreshing = true;
    try {
      const result = await getGoodsList({page: this.page, size: 10});
      if (result && !!result.length) {
        runInAction(() => {
          if (this.page === 1) {
            this.goodsList = result;
          } else {
            this.goodsList = this.goodsList.concat(result);
          }
          this.page = ++this.page;
        });
      } else {
        //没有数据了
        runInAction(() => {
          this.page = this.page - 1;
        });
      }
    } catch (error) {
    } finally {
      runInAction(() => {
        this.refreshing = false;
      });
    }
  }

  async requestGoodsCategory() {
    try {
      const result = await getTop10Category();
      runInAction(() => {
        this.goodsCategoryList = result;
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default ShopStore;
