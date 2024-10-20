import Link from 'next/link';
import styles from './ui.module.scss';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>All rights reserved ©</p>
      <div className={styles.social}>
        <a
          href="https://discord.gg/GyHqSX6QRM"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image width="62" height="44" src="/discord.png" alt="discord" />
        </a>

        <Link href="/">
          <Image width="62" height="44" src="/youtube.png" alt="youtube" />
        </Link>
      </div>
    </footer>
  );
};

export { Footer };
