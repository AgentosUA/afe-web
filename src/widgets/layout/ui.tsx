import { FC, PropsWithChildren } from 'react';

import { Footer } from './footer/ui';
import { Header } from './header/ui';

const Layout: FC<
  PropsWithChildren<{
    className?: string;
    isAuthorised?: boolean;
    currentPath?: string;
  }>
> = ({ children, isAuthorised = false, currentPath = '/' }) => {
  return (
    <div className="flex flex-col h-full">
      <Header currentPath={currentPath} isAuthorised={isAuthorised} />
      {children}
      <Footer />
    </div>
  );
};

export { Layout };
