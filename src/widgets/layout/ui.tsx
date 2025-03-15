import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';

import { Footer } from './footer/ui';
import { Header } from './header/ui';

const Layout: FC<
  PropsWithChildren<{
    className?: string;
  }>
> = ({ className, children }) => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main
        className={classNames(
          'flex flex-col w-full max-w-screen-2xl mx-auto my-4',
          className,
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export { Layout };
