import {
  getAccountInfo,
  getCollectionList,
  getFavorateList,
  getNoteList,
} from '@/services/modules/mine';
import {makeAutoObservable, runInAction} from 'mobx';

export type ArticleSimple = {
  id: number;
  title: string;
  userName: string;
  avatarUrl: string;
  favoriteCount: number;
  isFavorite: boolean;
  image: string;
};

export type Info = {
  followCount: number;
  fans: number;
  favorateCount: number;
};

export type ListData = {
  noteList: ArticleSimple[];
  collectionList: ArticleSimple[];
  favorateList: ArticleSimple[];
};

class MineStore {
  listData: ListData = {
    noteList: [],
    collectionList: [],
    favorateList: [],
  };
  refreshing: boolean = false;
  info: Info | {} = {};

  constructor() {
    makeAutoObservable(this);
  }

  requestNoteList = async () => {
    try {
      const result = await getNoteList();
      if (result) {
        runInAction(() => {
          this.listData.noteList = result;
        });
      } else {
        runInAction(() => {
          this.listData.noteList = [];
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  requestCollectionList = async () => {
    try {
      const result = await getCollectionList();
      if (result) {
        runInAction(() => {
          this.listData.collectionList = result;
        });
      } else {
        runInAction(() => {
          this.listData.collectionList = [];
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  requestFavorateList = async () => {
    try {
      const result = await getFavorateList();
      if (result) {
        runInAction(() => {
          this.listData.favorateList = result;
        });
      } else {
        runInAction(() => {
          this.listData.favorateList = [];
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  requestInfo = async () => {
    try {
      const result = await getAccountInfo();
      runInAction(() => {
        this.info = result;
      });
    } catch (error) {
      console.log(error);
    }
  };

  requestMineData = () => {
    runInAction(() => {
      this.refreshing = true;
    });

    Promise.all([
      this.requestNoteList(),
      this.requestCollectionList(),
      this.requestFavorateList(),
      this.requestInfo(),
    ]).then(() => {
      runInAction(() => {
        this.refreshing = false;
      });
    });
  };
}

export default MineStore;
