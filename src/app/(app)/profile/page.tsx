// 'use client';

// import { useEffect } from 'react';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { UserStats } from '@/entities/user/ui/profile/stats/ui';
import { UserCard } from '@/entities/user/ui/profile/user-card/ui';
import { Main } from '@/widgets/layout/main/ui';

const ProfilePage = async () => {
  const headersList = await headers();
  const host = headersList.get('host'); // Get the hostname
  const protocol = headersList.get('x-forwarded-proto') || 'http'; // Determine protocol
  const fullUrl = `${protocol}://${host}`;

  const fetchUser = async () => {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(`${fullUrl}/api/users/me`, {
        method: 'GET',

        headers: {
          Cookie: cookiesStore.toString(),
          'Content-Type': 'application/json',
        },
      });

      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const { user } = await fetchUser();

  console.log(user);

  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <Main>
      <h1 className="mb-6 text-lg">Профиль</h1>
      <div className="mx-auto flex p-4 w-full min-h-72 bg-white/15">
        <UserCard username={user?.username} avatar={user?.avatar?.url} />

        <UserStats className="m-auto" steamId={user?.steamId} />
      </div>
    </Main>
  );
};

export default ProfilePage;
