import { Layout } from '@/widgets/layout/ui';

import styles from './page.module.scss';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  const data = await fetch(
    `https://dummyjson.com/products?timestamp=${Date.now()}`,
    {
      cache: 'no-store',
    }
  ).then((res) => {
    console.log('HEREEREE');

    return res.json();
  });

  if (!data) return <Layout>Failed to load data</Layout>;

  return (
    <Layout>
      <div className={styles.news}>
        <Suspense fallback={<p>Loading...</p>}>
          <div>
            {data.products.map((item) => (
              <p key={item.id}>{item.title}</p>
            ))}
          </div>
        </Suspense>
      </div>
    </Layout>
  );
}
