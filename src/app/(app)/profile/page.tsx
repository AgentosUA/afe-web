import { UserStats } from '@/entities/user/ui/profile/stats/ui';
import { UserCard } from '@/entities/user/ui/profile/user-card/ui';
import { Layout } from '@/widgets/layout/ui';

import styles from './page.module.scss';

const ProfilePage = () => {
  return (
    <Layout>
      <h1 className={styles.title}>Профиль</h1>
      <div className={styles.content}>
        <UserCard />

        <UserStats className={styles.stats} />
      </div>
    </Layout>
  );
};

export default ProfilePage;
