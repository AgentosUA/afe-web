import { Button } from '@/shared/ui/atoms/button';
import { Layout } from '@/widgets/layout/ui';
import Image from 'next/image';

import styles from './page.module.scss';

export default function Faq() {
  return (
    <Layout className={styles.main}>
      <Image src="/logo.png" width="514" height={218} alt="logo" />
      <Button className={styles.heroButton}>Начать играть</Button>
    </Layout>
  );
}
