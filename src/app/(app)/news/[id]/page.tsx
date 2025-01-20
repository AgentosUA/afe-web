import { RichText } from '@payloadcms/richtext-lexical/react';
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
      <div className="bg-black p-5 shadow">
        <h1 className="text-4xl">{data.title}</h1>
        {data.preview && (
          <Image
            src={data.preview?.url}
            width={250}
            height={250}
            alt={data.title}
          />
        )}
        <div>{data.date}</div>
        <RichText data={data.content} />
      </div>
    </Layout>
  );
}
