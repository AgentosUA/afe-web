import { RichText } from '@payloadcms/richtext-lexical/react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { getPayload } from 'payload';

import NotFoundPage from '@/app/(app)/404';
import payloadConfig from '@/payload.config';
import { Layout } from '@/widgets/layout/ui';

export const dynamic = 'force-dynamic';

export default async function NewsDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  if (!id) return <NotFoundPage />;

  const payload = await getPayload({
    config: payloadConfig,
  });

  const data = await payload.findByID({
    id,
    collection: 'posts',
  });

  if (!data) return <NotFoundPage />;

  return (
    <Layout className="!mt-12">
      <div className="bg-black/75 backdrop-blur-md p-5 shadow">
        <h1 className="text-4xl flex justify-between items-center text-red-700">
          {data.title}
          <span className="text-lg text-red-700 text-right">
            {dayjs(data.date).format('DD.MM.YYYY')}
          </span>
        </h1>
        {data.preview && (
          <Image
            className="w-full h-96 object-cover my-2"
            width={900}
            height={384}
            src={data.preview?.url}
            alt={data.title}
          />
        )}

        <RichText className='[&>ul]:list-disc [&>li]:pl-5' data={data.content} />
      </div>
    </Layout>
  );
}
