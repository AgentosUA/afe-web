import type { Metadata } from 'next';

import { Roboto } from 'next/font/google';

import '@/shared/styles/global.scss';

const inter = Roboto({
  subsets: ['cyrillic'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Metro: After the end',
  description: 'DayZ RP server',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
