import { Layout } from '@/widgets/layout/ui';

import styles from './page.module.scss';

export default async function NewsPage() {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);

    console.log('test');
  });

  return (
    <Layout>
      <div className={styles.news}>test</div>
    </Layout>
  );
}
