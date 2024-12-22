import Image from 'next/image';
import Link from 'next/link';
import { FC, Suspense } from 'react';

import { afeApi } from '@/shared/sdk';
import { Layout } from '@/widgets/layout/ui';

import styles from './page.module.scss';
import { store } from '@/entities/store';

export const dynamic = 'force-dynamic';

const Post: FC<{
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}> = ({ title, description, date, image = '/logo.png' }) => (
  <article className={styles.post}>
    <Image src={image} width={350} height={150} alt={title} />
    <div className={styles.content}>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{date}</p>
    </div>
  </article>
);

const Posts = async () => {
  const { data } = await afeApi.news.getAll();

  if (!data) return <Layout>Failed to load data</Layout>;

  return (
    <div className={styles.posts}>
      {data.map((item) => (
        <Link key={item.id} href={`/news/${item.id}`}>
          <Post {...item} />
        </Link>
      ))}
    </div>
  );
};

const PostsSkeleton = () => {
  return (
    <div className={styles.posts}>
      <div className={styles.skeleton} />
      <div className={styles.skeleton} />
      <div className={styles.skeleton} />
      <div className={styles.skeleton} />
      <div className={styles.skeleton} />
      <div className={styles.skeleton} />
    </div>
  );
};

export default async function NewsPage() {
  return (
    <Layout className={styles.main}>
      <h1>Новости</h1>
      <Suspense fallback={<PostsSkeleton />}>
        <Posts />
      </Suspense>
    </Layout>
  );
}
