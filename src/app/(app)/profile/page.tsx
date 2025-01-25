// 'use client';

// import { useEffect } from 'react';

import { cookies } from 'next/headers';

import { UserStats } from '@/entities/user/ui/profile/stats/ui';
import { UserCard } from '@/entities/user/ui/profile/user-card/ui';
import { Layout } from '@/widgets/layout/ui';

import styles from './page.module.scss';

const ProfilePage = async () => {
  // console.log(cookieStore.getAll());

  const fetchUser = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/users/me', {
        method: 'GET',

        headers: {
          Cookie: cookies().toString(),
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  await fetchUser();

  return (
    <Layout>
      <h1 className={styles.title}>Профиль</h1>
      <div className={styles.content}>
        <UserCard />

        <UserStats className={styles.stats} steamId="" />
      </div>
    </Layout>
  );
};

export default ProfilePage;
