// 'use client';

import type { AxiosInstance } from 'axios';
import { getCookie } from 'cookies-next/client';
// import * as cookieCutter from 'cookie-cutter';

const setTokenFromCookies = (instance: AxiosInstance) => {
  const token = getCookie('token');
  instance.defaults.headers.common['Authorization'] = token
    ? `Bearer ${token}`
    : undefined;

  return Boolean(token);
};

export { setTokenFromCookies };
