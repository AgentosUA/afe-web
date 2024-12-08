// 'use client';

import type { AxiosInstance } from 'axios';

// import { getCookie } from 'cookies-next/server';
// import * as cookieCutter from 'cookie-cutter';

const setTokenFromCookies = async (token: string, instance: AxiosInstance) => {
  instance.defaults.headers.common['Authorization'] = token
    ? `Bearer ${token}`
    : undefined;

  return Boolean(token);
};

export { setTokenFromCookies };
