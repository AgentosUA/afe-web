import Image from 'next/image';

import NotFoundPage from '@/app/404';
import { afeApi } from '@/shared/sdk';
import { Layout } from '@/widgets/layout/ui';

export const dynamic = 'force-dynamic';

export default async function NewsDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  if (!id) return <NotFoundPage />;

  const { data } = await afeApi.news.getById(id);

  // if (!data) return <NotFoundPage />;

  return (
    <Layout className="!mt-12">
      <div className="bg-black p-5 shadow">
        <h1 className="text-4xl">{data.title}</h1>
        {data.image && (
          <img src={data.image} width={250} height={250} alt={data.title} />
        )}
        <div>{data.date}</div>
        <div
          className=""
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></div>
      </div>
    </Layout>
  );
}
