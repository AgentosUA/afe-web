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
    <Link
      className=" bg-black w-96 h-96 hover:zoom-in-50 hover:scale-105 transition-transform duration-75 rounded p-4 border-black min-w-60 hover:border-red-700 overflow-hidden"
      href={`/news/${post.id}`}
    >
      <Card className="bg-transparent border-none">
        <CardHeader className="relative min-h-60 overflow-hidden">
          <img
            className="object-cover absolute top-0 left-0 w-full h-full"
            src={post.image ? post.image : '/logo.png'}
            // fill
            alt={post.title}
          />
        </CardHeader>
        <CardTitle className="text-white">{post.title}</CardTitle>
        <CardDescription className="text-gray-400">
          {post.description}
        </CardDescription>
        <CardFooter className="text-red-800">{post.date}</CardFooter>
      </Card>
    </Link>
  );
};

const Posts = async () => {
  const { data } = await afeApi.news.getAll();

  // await new Promise((resolve) => setTimeout(resolve, 500));

  if (!data) return <Layout>Failed to load data</Layout>;

  return (
    <div className="flex w-full items-center flex-wrap min-w-60 gap-4">
      {data.map((item) => (
        <PostCard key={item.id} post={item} />
      ))}
    </div>
  );
};

const Skeleton = () => (
  <div className="bg-black w-96 h-96 hover:zoom-in-50 hover:scale-105 transition-transform duration-1000 rounded p-4 border-black animate-pulse" />
);

const PostsSkeleton = () => {
  return (
    <div className="flex w-full items-center flex-wrap min-w-60 gap-4">
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
    <Layout className='!mt-6'>
      <h1 className="text-2xl mb-4">Новости</h1>
      <Suspense fallback={<PostsSkeleton />}>
        <Posts />
      </Suspense>
    </Layout>
  );
}
