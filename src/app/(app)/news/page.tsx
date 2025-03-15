import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { getPayload } from 'payload';
import { FC, Suspense } from 'react';

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
  titleEn: string;
  titleRu: string;
  descriptionEn: string;
  descriptionRu: string;
  date: string;
  image: string;
}> = ({ id, titleEn, titleRu, descriptionEn, descriptionRu, date, image }) => {
  return (
    <Link
      className="bg-black border border-gray-900 w-96 h-96 hover:zoom-in-50 lg:hover:scale-105 lg:transition-transform lg:duration-75  p-4  min-w-60 lg:hover:border-red-700 overflow-hidden max-[1218px]:w-full"
      href={`/news/${id}`}
    >
      <Card className="bg-transparent border-none">
        <CardHeader className="relative min-h-60 overflow-hidden">
          <Image
            className="absolute top-0 left-0 w-full h-full"
            src={image!}
            width={200}
            quality="100"
            height={200}
            alt={titleEn ?? 'image'}
          />
        </CardHeader>
        <CardTitle className="text-white mx-2 my-3">{titleEn}</CardTitle>
        <CardDescription className="text-gray-400 m-2">
          {descriptionEn}
        </CardDescription>
        <CardFooter className="m-2 text-red-800 font-bold text-right justify-end text-sm">
          {dayjs(date).format('DD.MM.YYYY')}
        </CardFooter>
      </Card>
    </Link>
  );
};

const Posts = async () => {
  const payload = await getPayload({
    config: payloadConfig,
  });

  const data = await payload.find({
    collection: 'news',
    limit: 99999,
  });

  if (!data.docs.length) {
    return <h3 className="text-lg text-center">Новостей не найдено</h3>;
  }

  return (
    <div className="flex w-full items-center flex-wrap min-w-60 gap-4 max-md:justify-center">
      {data.docs.map((item) => (
        <PostCard
          key={item.id}
          id={item.id}
          titleEn={item.titleEN}
          titleRu={item.titleRU}
          date={item.date}
          descriptionEn={item.descriptionEN}
          descriptionRu={item.descriptionRU}
          image={
            typeof item.preview === 'string'
              ? item.preview
              : (item.preview?.url ?? '')
          }
        />
      ))}
    </div>
  );
};

const Skeleton = () => (
  <div className="bg-black border border-gray-900 w-96 h-96 lg:hover:zoom-in-50 hover:scale-105 transition-transform duration-1000 p-4 animate-pulse max-lg:w-full max-[1218px]:w-full" />
);

const PostsSkeleton = () => {
  return (
    <div className="flex w-full items-center flex-wrap min-w-60 gap-4 max-md:justify-center">
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
    <Layout className="max-w-screen-xl">
      <h1 className="text-2xl mb-4 max-md:text-center">Новости</h1>
      <Suspense fallback={<PostsSkeleton />}>
        <Posts />
      </Suspense>
    </Layout>
  );
}
