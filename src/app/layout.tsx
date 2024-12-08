import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import '@/shared/styles/global.scss';
import { cookies } from 'next/headers';

import { RootStore } from '@/entities/store';
import { StoreProvider } from '@/entities/store/provider';
import { instance } from '@/shared/sdk';
import { setTokenFromCookies } from '@/shared/sdk/lib';

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get('token');

  const isAuthorised = await setTokenFromCookies(
    cookieToken?.value ?? '',
    instance
  );

  const initialData = {
    user: {
      isAuthorised,
    },
  } as Partial<RootStore>;

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
        <StoreProvider initialData={initialData}>{children}</StoreProvider>
        {/* {children} */}
      </body>
    </html>
  );
}
