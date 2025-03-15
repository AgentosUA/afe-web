import { makeAutoObservable } from 'mobx';

import { User } from '@/payload-types';

class UserModel {
  data: User | null = null;

  isAuthorized = false;

  constructor(data: { isAuthorized: boolean; data: User | null }) {
    makeAutoObservable(this);

    this.isAuthorized = data.isAuthorized;
    this.data = data.data;
  }

  login = (data: User) => {
    this.isAuthorized = true;
    this.data = data;
  };

  logout = async () => {
    this.isAuthorized = false;
    this.data = null;

    fetch('/api/users/logout', {
      method: 'POST',
      credentials: 'include',
    });

    console.log(this.isAuthorized);
  };

  // hydrate = (data: Partial<UserModel>) => {
  //   runInAction(() => {
  //     this.isAuthorised = data.isAuthorised ?? false;
  //     this.data = data.data ?? null;
  //   });
  // };
}

export { UserModel };
