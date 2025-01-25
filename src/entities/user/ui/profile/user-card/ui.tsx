import Image from 'next/image';
import { FC } from 'react';

const UserCard: FC<{
  avatar?: string;
  username: string;
}> = ({ avatar, username }) => {
  return (
    <div>
      <div className="relative">
        <Image
          width={250}
          height={250}
          src={avatar ? avatar : '/avatar.png'}
          alt={username ?? ''}
        />
      </div>
      <h2 className="mt-2 text-center">{username}</h2>
    </div>
  );
};

export { UserCard };
