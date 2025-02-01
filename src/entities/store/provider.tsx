'use client';

import { createContext, FC, PropsWithChildren, useContext } from 'react';

import { UserModel } from '../user/model';

const RootStore = {
  user: new UserModel(),
};

const StoreContext = createContext(RootStore);

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StoreContext.Provider value={RootStore}>{children}</StoreContext.Provider>
  );
};

const useStore = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStore };
