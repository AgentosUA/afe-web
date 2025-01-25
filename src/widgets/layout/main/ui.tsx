import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';

export const Main: FC<
  PropsWithChildren<{
    className?: string;
  }>
> = ({ className, children }) => (
  <main
    className={classNames(
      'flex flex-col w-full max-w-screen-2xl mx-auto my-4',
      className,
    )}
  >
    {children}
  </main>
);
