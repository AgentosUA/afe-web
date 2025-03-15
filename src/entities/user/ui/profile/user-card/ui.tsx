'use client';

import { observer } from 'mobx-react-lite';
import Image from 'next/image';

import { store } from '@/entities/store';

import styles from './ui.module.scss';

const UserCard = observer(() => {
  return (
    <div className={styles.user}>
      <div className={styles.avatarWrapper}>
        <Image
          fill
          src={
            store.user.data?.avatar ? store.user.data?.avatar : '/avatar.png'
          }
          alt={store.user.data?.username ?? ''}
        />
      </div>
      <h2 className={styles.username}>{store.user.data?.username}</h2>
    </div>
  );
});

export { UserCard };
