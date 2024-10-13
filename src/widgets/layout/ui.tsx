import { FC, PropsWithChildren } from 'react';

import { Header } from './header/ui';

import styles from './ui.module.scss';
import classNames from 'classnames';
import { Footer } from './footer/ui';

const Layout: FC<
  PropsWithChildren<{
    className?: string;
  }>
> = ({ className, children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={classNames(styles.main, className)}>{children}</main>
      <Footer />
    </div>
  );
};

export { Layout };
