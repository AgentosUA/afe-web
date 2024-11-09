import { setCookie } from 'cookies-next/client';
import { makeAutoObservable } from 'mobx';

import { afeApi, User, instance, LoginDto } from '@/shared/sdk';
import { setTokenFromCookies } from '@/shared/sdk/lib';

class UserModel {
  data: User | null = null;

  isLoading = false;

  isAuthorized = false;

  booted = false;

  constructor() {
    makeAutoObservable(this);
    this.boot();
  }

  boot = () => {
    const isAuthorized = setTokenFromCookies(instance);

    if (isAuthorized) {
      this.get();
    }

    this.isAuthorized = isAuthorized;

    this.booted = true;
  };

  get = async () => {
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

      setTokenFromCookies(instance);

      this.isAuthorized = true;
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

    this.isAuthorized = false;
  };
}

const user = new UserModel();

export { user, UserModel };
