import Link from 'next/link';

import Image from 'next/image';

import styles from './ui.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.mainNav}>
        <Link href="/news">Новости</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/stats">Статистика</Link>
        <Link href="/wiki">Wiki</Link>
      </nav>
      
      <Image
        className={styles.logo}
        width="120"
        height="98"
        src="/header-logo.png"
        alt="Metro: After the end"
      />
      <nav className={styles.authNav}>
        <Link href="/auth/sign-in">Войти</Link>
        <Link href="/auth/signup">Регистрация</Link>
      </nav>
    </header>
  );
};

export { Header };
