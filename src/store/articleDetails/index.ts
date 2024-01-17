import {makeAutoObservable, runInAction} from 'mobx';
import {getArticleDetail} from '@/services/modules/articleDetails';

export type ArticleComment = {
  userName: string;
  avatarUrl: string;
  message: string;
  dateTime: string;
  location: string;
  favoriteCount: number;
  isFavorite: boolean;
  children?: ArticleComment[];
};

export type Article = {
  id: number;
  title: string;
  desc: string;
  tag: string[];
  dateTime: string;
  location: string;
  userId: number;
  userName: string;
  isFollow: boolean;
  avatarUrl: string;
  images: string[];
  favoriteCount: number;
  collectionCount: number;
  isFavorite: boolean;
  isCollection: boolean;
  comments?: ArticleComment[];
};

class ArticleDetials {
  detail: Article | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async requestDetailData(id: number) {
    const result = await getArticleDetail({id});
    if (result) {
      runInAction(() => {
        this.detail = result;
      });
    }
    console.log('detail=', result);
  }
}

export default ArticleDetials;
