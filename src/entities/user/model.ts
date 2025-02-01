import { makeAutoObservable, runInAction } from 'mobx';

import { User } from '@/shared/sdk';

class UserModel {
  data: User | null = null;

  isLoading = false;

  isAuthorised = false;

  constructor() {
    makeAutoObservable(this);
  }

  hydrate = (data: Partial<UserModel>) => {
    runInAction(() => {
      this.isAuthorised = data.isAuthorised ?? false;
      this.data = data.data ?? null;
    });
  };
}

export { UserModel };
