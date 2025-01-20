import Image from 'next/image';

import { Button } from '@/shared/ui/atoms/button';
import { Layout } from '@/widgets/layout/ui';

import styles from './page.module.scss';

export default function Home() {
  return (
    <Layout className={styles.main}>
      <Image
        className={styles.logo}
        src="/logo.png"
        width={514}
        height={218}
        priority
        alt="logo"
      />
      <a
        href="https://discord.gg/GyHqSX6QRM"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          className="bg-red-700 hover:bg-red-800 text-lg uppercase font-bold"
          size="lg"
        >
          Начать играть
        </Button>
      </a>
    </Layout>
  );
}
