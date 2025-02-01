import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { cookies } from 'next/headers';

import '@/shared/styles/global.scss';

import { StoreProvider } from '@/entities/store';
import { Layout } from '@/widgets/layout/ui';

const roboto = Roboto({
  subsets: ['cyrillic'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Metro: After the end',
  description: 'DayZ RP server',
};

export default async function RootLayout({
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  // const payload = await getPar;

  console.log(props);

  // const isAuthorized =

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-48x48.png"
          sizes="48x48"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={roboto.className}>
        <StoreProvider>
          <Layout>{children}</Layout>
        </StoreProvider>
      </body>
    </html>
  );
}
