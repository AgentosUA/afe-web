import Image from 'next/image';
import { FC } from 'react';

import NotFoundPage from '@/app/404';
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

export default async function NewsDetailsPage({ params }) {
  const { id } = await params;
  if (!id) return <NotFoundPage />;

  const { data } = await afeApi.news.getById(id);

  // if (!data) return <NotFoundPage />;

  return (
    <Layout className={styles.main}>
      <h1>{data.title}</h1>
      <div>{data.date}</div>
      <div>{data.description}</div>
      <div
        className={styles.postContent}
        dangerouslySetInnerHTML={{ __html: data.content }}
      ></div>
    </Layout>
  );
}
