'use client';

import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { user } from '@/entities/user/model';
import { useMounted } from '@/shared/ui/hooks';
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

  const isMounted = useMounted();

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

      <View.Condition if={!isMounted}>
        <nav className={styles.authNav} />
      </View.Condition>

      <View.Condition if={isMounted}>
        <View.Condition if={!user.isAuthorized}>
          <nav className={styles.authNav}>
            <Link href="/auth/sign-in">Вход</Link>
            <Link href="/auth/signup">Регистрация</Link>
          </nav>
        </View.Condition>
        <View.Condition if={user.isAuthorized}>
          <nav className={styles.authNav}>
            <Link href="/prifle">Профиль</Link>
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                user.logout();
              }}
            >
              Вьход
            </Link>
          </nav>
        </View.Condition>
      </View.Condition>
    </header>
  );
});

export { Header };
