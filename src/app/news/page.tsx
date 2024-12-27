import Image from 'next/image';
import Link from 'next/link';
import { FC, Suspense } from 'react';

import { afeApi, Post } from '@/shared/sdk';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/atoms/card';
import { Layout } from '@/widgets/layout/ui';

import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

const PostCard: FC<{ post: Post }> = ({ post }) => {
  return (
    <Card className="bg-black w-96 h-96 hover:zoom-in-50 hover:scale-105 transition-transform duration-75 rounded p-4 border-black">
      <CardHeader className="relative min-h-60">
        <Image
          className="object-scale-down"
          src={post.image ? post.image : '/logo.png'}
          fill
          alt={post.title}
        />
      </CardHeader>
      <CardTitle>{post.title}</CardTitle>
      <CardDescription>{post.description}</CardDescription>
      <CardFooter>{post.date}</CardFooter>
    </Card>
  );
};

const Posts = async () => {
  const { data } = await afeApi.news.getAll();

  // await new Promise((resolve) => setTimeout(resolve, 500));

  if (!data) return <Layout>Failed to load data</Layout>;

  return (
    <div className="flex align-middle flex-wrap gap-5">
      {data.map((item) => (
        <Link key={item.id} href={`/news/${item.id}`}>
          <PostCard post={item} />
        </Link>
      ))}
    </div>
  );
};

const Skeleton = () => (
  <div className="bg-black w-96 h-96 hover:zoom-in-50 hover:scale-105 transition-transform duration-1000 rounded p-4 border-black animate-pulse" />
);

const PostsSkeleton = () => {
  return (
    <div className="flex align-middle flex-wrap gap-5">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
};

export default async function NewsPage() {
  return (
    <Layout className={styles.main}>
      <h1 className="text-2xl mb-4">Новости</h1>
      <Suspense fallback={<PostsSkeleton />}>
        <Posts />
      </Suspense>
    </Layout>
  );
}
