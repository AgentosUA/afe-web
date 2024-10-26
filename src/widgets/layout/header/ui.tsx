'use client';

import Link from 'next/link';

import Image from 'next/image';

import { usePathname } from 'next/navigation';

import styles from './ui.module.scss';
import classNames from 'classnames';

const Header = () => {
  const currentPath = usePathname();

  const mainLinks = [
    {
      href: '/news',
      title: 'Новости',
    },

    {
      href: '/faq',
      title: 'FAQ',
    },

    // {
    //   href: '/wiki',
    //   title: 'Wiki',
    // },
  ];

  return (
    <header className={styles.header}>
      <nav className={styles.mainNav}>
        {mainLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={classNames({
              [styles.active]: currentPath === link.href,
            })}
          >
            {link.title}
          </Link>
        ))}
      </nav>

      <Link href="/">
        <Image
          className={styles.logo}
          width="120"
          height="98"
          src="/header-logo.png"
          alt="Metro: After the end"
        />
      </Link>

      <nav className={styles.authNav}>
        <Link href="/auth/sign-in">Войти</Link>
        <Link href="/auth/signup">Регистрация</Link>
      </nav>
    </header>
  );
};

export { Header };
