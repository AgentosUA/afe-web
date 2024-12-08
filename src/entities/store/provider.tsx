'use client';

import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';

import { RootStore, store } from './index';

const StoreProvider = observer(
  ({
    children,
    initialData,
  }: PropsWithChildren<{
    initialData: Partial<RootStore>;
  }>) => {
    store.hydrate(initialData);

    return children;
  }
);

export { StoreProvider };
