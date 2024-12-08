import { setCookie } from 'cookies-next/client';
import { makeAutoObservable, runInAction } from 'mobx';

import { afeApi, User, instance, LoginDto } from '@/shared/sdk';
import { setTokenFromCookies } from '@/shared/sdk/lib';

class UserModel {
  data: User | null = null;

  isLoading = false;

  isAuthorised = false;

  constructor() {
    makeAutoObservable(this);
  }

  hydrate = (data: Partial<UserModel>) => {
    runInAction(() => {
      this.isAuthorised = data.isAuthorised ?? false;
    });
  };

  boot = async (isAuthorised: boolean) => {
    if (isAuthorised) {
      await this.get();
    }

    runInAction(() => {
      this.isAuthorised = isAuthorised;
    });
  };

  get = async (checkIsAuth = false) => {
    if (checkIsAuth && !this.isAuthorised) return;

    try {
      this.isLoading = true;

      const { data } = await afeApi.user.get();

      this.data = data;
    } catch (error) {
      this.logout();
    } finally {
      this.isLoading = false;
    }
  };

  login = async (values: LoginDto, onError?: (string: string) => void) => {
    try {
      this.isLoading = true;

      const {
        data: { token, refreshToken },
      } = await afeApi.user.login(values);

      setCookie('token', token, {
        path: '/',
      });

      setCookie('refreshToken', refreshToken, {
        path: '/',
      });

      setTokenFromCookies(token, instance);

      runInAction(() => {
        this.isAuthorised = true;
      });
    } catch (error: any) {
      onError?.(error?.response?.data?.message ?? 'Unknown error');
    } finally {
      this.isLoading = false;
    }
  };

  logout = () => {
    setCookie('token', '', {
      path: '/',
    });

    setCookie('refreshToken', '', {
      path: '/',
    });

    runInAction(() => {
      this.isAuthorised = false;
    });
  };
}

export { UserModel };
