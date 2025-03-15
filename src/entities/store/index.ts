import { makeAutoObservable } from 'mobx';

import { UserModel } from '../user/model';

export class RootStore {
  user: UserModel;

  constructor() {
    this.user = new UserModel();

    makeAutoObservable(this);
  }

  hydrate(data?: Partial<RootStore>) {
    if (data?.user) {
      this.user.hydrate(data.user);
    }
  }
}

const store = new RootStore();

export { store };
