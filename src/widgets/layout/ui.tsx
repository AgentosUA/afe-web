import { FC, PropsWithChildren } from 'react';

import { Footer } from './footer/ui';
import { Header } from './header/ui';

const Layout: FC<
  PropsWithChildren<{
    className?: string;
  }>
> = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export { Layout };
