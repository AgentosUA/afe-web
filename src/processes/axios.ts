'use client';

import { getCookie, setCookie } from 'cookies-next/server';

import { user } from '@/entities/user/model';
import { afeApi, instance } from '@/shared/sdk';

let refreshPromise: Promise<string | void> | null = null;

instance.interceptors.request.use(function (config) {
  const token = getCookie('token');
  const refreshToken = getCookie('refreshToken');
  // const token = cookieCutter.get('token');
  // const refreshToken = cookieCutter.get('refreshToken');

  if (config.url?.includes('refresh-token')) {
    config.headers.Authorization = refreshToken
      ? `Bearer ${refreshToken}`
      : undefined;
  } else {
    config.headers.Authorization = token ? `Bearer ${token}` : undefined;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (!refreshPromise) {
      refreshPromise = afeApi.user
        .refreshToken()
        .then(({ data: { token, refreshToken } }) => {
          setCookie('token', token, {
            path: '/',
          });

          setCookie('refreshToken', refreshToken, {
            path: '/',
          });

          return token;
        })
        .catch(() => {
          user.logout();
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    const token = await refreshPromise;

    if (!token) {
      return Promise.reject(error);
    }

    error.config.headers.Authorization = `Bearer ${token}`;

    return instance.request(error.config);
  }
);
