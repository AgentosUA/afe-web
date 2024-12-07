import Image from 'next/image';
import Link from 'next/link';
import { FC, Suspense } from 'react';

import { afeApi } from '@/shared/sdk';
import { Layout } from '@/widgets/layout/ui';

import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

const Post: FC<{
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}> = ({ title, description, date, image = '/logo.png' }) => (
  <article className={styles.post}>
    <Image src={image} width={250} height={250} alt={title} />
    <div className={styles.content}>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{date}</p>
    </div>
  </article>
);

export default async function NewsPage() {
  const { data } = await afeApi.news.getAll();

  if (!data) return <Layout>Failed to load data</Layout>;

  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>
        <h1>Новости</h1>
        <div className={styles.posts}>
          {data.map((item) => (
            <Link key={item.id} href={`/news/${item.id}`}>
              <Post {...item} />
            </Link>
          ))}
        </div>
      </Suspense>
    </Layout>
  );
}
