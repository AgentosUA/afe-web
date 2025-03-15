import Image from 'next/image';

import { Button } from '@/shared/ui/atoms/button';
import { Layout } from '@/widgets/layout/ui';

export default function Home() {
  return (
    <Layout className="justify-center items-center my-auto">
      <Image
        className="md:max-w-full md:h-auto"
        src="/logo.png"
        width={514}
        height={218}
        priority
        alt="logo"
      />
      <a
        href="https://discord.gg/GyHqSX6QRM"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          className="bg-red-700 hover:bg-red-800 text-lg uppercase font-bold"
          size="lg"
        >
          Почати грати
        </Button>
      </a>
    </Layout>
  );
}
