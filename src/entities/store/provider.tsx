'use client';

import { createContext, FC, PropsWithChildren, useContext } from 'react';

import { User } from '@/payload-types';

import { UserModel } from '../user/model';

type Store = {
  user: UserModel;
};

const StoreContext = createContext<Store | null>(null);

const useStore = () => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }

  return store;
};

type StoreProviderProps = PropsWithChildren<{
  initial: {
    user: {
      isAuthorized: boolean;
      data: User | null;
    };
  };
}>;

const StoreProvider: FC<StoreProviderProps> = ({ initial, children }) => {
  const store: Store = {
    user: new UserModel(initial.user),
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export { StoreProvider, useStore };
