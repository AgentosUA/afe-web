'use client';

import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { store } from '@/entities/store';
import { View } from '@/shared/ui/quarks/view/ui';

import styles from './ui.module.scss';

const Header = observer(() => {
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

      <View.Condition if={!store.user.isAuthorised}>
        <nav className={styles.authNav}>
          <Link href="/auth/sign-in">Вход</Link>
          <Link href="/auth/signup">Регистрация</Link>
        </nav>
      </View.Condition>
      <View.Condition if={store.user.isAuthorised}>
        <nav className={styles.authNav}>
          <Link href="/profile">Профиль</Link>
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              store.user.logout();
            }}
          >
            Вьход
          </Link>
        </nav>
      </View.Condition>
    </header>
  );
});

export { Header };
