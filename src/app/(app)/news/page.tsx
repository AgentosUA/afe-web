import Image from 'next/image';
import Link from 'next/link';
import { getPayload } from 'payload';
import { FC, Suspense } from 'react';

import { Media } from '@/payload-types';
import payloadConfig from '@/payload.config';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/atoms/card';
import { Layout } from '@/widgets/layout/ui';

// export const dynamic = 'force-dynamic';

const PostCard: FC<{
  id: string;
  title: string;
  description: string;
  date: string;
  image: Media;
}> = ({ id, title, date, description, image }) => {
  return (
    <Link
      className=" bg-black w-96 h-96 hover:zoom-in-50 hover:scale-105 transition-transform duration-75 rounded p-4 border-black min-w-60 hover:border-red-700 overflow-hidden"
      href={`/news/${id}`}
    >
      <Card className="bg-transparent border-none">
        <CardHeader className="relative min-h-60 overflow-hidden">
          <Image
            className="object-cover absolute top-0 left-0 w-full h-full"
            src={image.url!}
            width="200"
            height={200}
            alt={title}
          />
        </CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-gray-400">
          {description}
        </CardDescription>
        <CardFooter className="text-red-800">{date}</CardFooter>
      </Card>
    </Link>
  );
};

const Posts = async () => {
  const payload = await getPayload({
    config: payloadConfig,
  });

  const data = await payload.find({
    collection: 'posts',
  });

  console.log(data);

  return (
    <div className="flex w-full items-center flex-wrap min-w-60 gap-4">
      {data.docs.map((item) => (
        <PostCard
          key={item.id}
          id={item.id}
          title={item.title}
          date={item.date}
          description={item.description}
          image={item.preview}
        />
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
    <Layout className="!mt-6">
      <h1 className="text-2xl mb-4">Новости</h1>
      <Suspense fallback={<PostsSkeleton />}>
        <Posts />
      </Suspense>
    </Layout>
  );
}
