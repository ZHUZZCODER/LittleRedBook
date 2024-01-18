import {getMessageList, getUnread} from '@/services/modules/message';
import {makeAutoObservable, runInAction} from 'mobx';

export type MessageListItem = {
  id: number;
  name: string;
  avatarUrl: string;
  lastMessage?: string;
  lastMessageTime?: string;
};

export type UnRead = {
  unreadFavorate: number;
  newFollow: number;
  comment: number;
};

class MessageStore {
  page: number = 1;
  messageList: MessageListItem[] = [];
  refreshing: boolean = false;
  unRead: UnRead | {} = {};

  constructor() {
    makeAutoObservable(this);
  }

  async requestMessageList() {
    if (this.refreshing) return;
    this.refreshing = true;
    try {
      const result = await getMessageList({page: this.page, size: 10});
      if (result && !!result.length) {
        runInAction(() => {
          if (this.page === 1) {
            this.messageList = result;
          } else {
            this.messageList = this.messageList.concat(result);
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

  async requestUnread() {
    try {
      const result = await getUnread();
      runInAction(() => {
        this.unRead = result || {};
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default MessageStore;
