'use client';

import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import { Button } from '@/shared/ui/atoms/button';
import { Input } from '@/shared/ui/atoms/input/ui';

import styles from './ui.module.scss';

const UserStats = observer<{
  className?: string;
  steamId?: string;
}>(({ className, steamId }) => {
  if (!steamId) {
    return (
      <div className={classNames(styles.form, className)}>
        <h3>Для перегляду статистики введіть STEAM ID</h3>
        <div className={styles.col}>
          <Input placeholder="STEAM ID" />
          <Button>Підтвердити</Button>
        </div>
      </div>
    );
  }
  return <div className={styles.stats}></div>;
});

export { UserStats };
