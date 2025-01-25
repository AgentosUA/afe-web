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
      title: 'Новини',
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

  const logout = () => {
    fetch('/api/users/logout', {
      method: 'POST',
      credentials: 'include',
    });
  };

  return (
    <header className="sticky top-0 flex justify-center items-center gap-[40px] backdrop-blur-md bg-black/70 px-[40px] py-[0] h-[98px] flex-shrink-0 z-10">
      <nav className={styles.mainNav}>
        {mainLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={classNames('hover:text-red-700', {
              'text-red-700': currentPath === link.href,
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
          height="94"
          src="/header-logo.png"
          alt="Metro: After the end"
        />
      </Link>

      <View.Condition if={!store.user.isAuthorised}>
        <nav className={styles.authNav}>
          <Link href="/auth/sign-in">Увійти</Link>
          <Link href="/auth/sign-up">Реєстрація</Link>
        </nav>
      </View.Condition>

      <nav className={styles.authNav}>
        <Link href="/profile">Профіль</Link>
        <Link
          href="/"
          onClick={(e) => {
            logout();
          }}
        >
          Вихід
        </Link>
      </nav>
    </header>
  );
});

export { Header };
