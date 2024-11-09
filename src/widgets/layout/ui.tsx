import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';

import { Footer } from './footer/ui';
import { Header } from './header/ui';
import styles from './ui.module.scss';

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
