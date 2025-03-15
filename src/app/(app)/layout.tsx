import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { cookies, headers } from 'next/headers';

import '@/shared/styles/global.scss';

import { StoreProvider } from '@/entities/store';
import { User } from '@/payload-types';

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
  const headersList = await headers();
  const host = headersList.get('host'); // Get the hostname
  const protocol = headersList.get('x-forwarded-proto') || 'http'; // Determine protocol
  const fullUrl = `${protocol}://${host}`;

  const isAuthorized = Boolean(cookieStore.get('payload-token'));

  let user: User | null = null;

  if (isAuthorized) {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(`${fullUrl}/api/users/me`, {
        method: 'GET',

        headers: {
          Cookie: cookiesStore.toString(),
          'Content-Type': 'application/json',
        },
      });

      user = await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  const initial = {
    user: {
      data: user,
      isAuthorized,
    },
  };

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
        <StoreProvider initial={initial}>{children}</StoreProvider>
      </body>
    </html>
  );
}
