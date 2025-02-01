'use client';

import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useStore } from '@/entities/store';

import styles from './ui.module.scss';

// type HeaderProps = {
//   isAuthorised: boolean;
// };

const Header = () => {
  const currentPath = usePathname();
  const {
    user: { isAuthorized, logout },
  } = useStore();

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

      <nav className={styles.authNav}>
        {!isAuthorized && (
          <>
            <Link href="/auth/sign-in">Увійти</Link>
            <Link href="/auth/sign-up">Реєстрація</Link>
          </>
        )}
        {isAuthorized && (
          <>
            <Link
              className={classNames('hover:text-red-700', {
                'text-red-700': currentPath === '/profile',
              })}
              href="/profile"
            >
              Профіль
            </Link>
            <Link href="/" className="hover:text-red-700" onClick={logout}>
              Вихід
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export { Header };
