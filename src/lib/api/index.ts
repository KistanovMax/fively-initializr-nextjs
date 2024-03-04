import axios from 'axios';
import { getSession } from 'next-auth/react';

import { logout } from '@/actions/auth';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const protectedApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

protectedApi.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (!session) return config;

    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${session.user.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

protectedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;

    if (error.response.status === 401 && !prevRequest.sent) {
      prevRequest.sent = true;

      logout();
    }

    return Promise.reject(error);
  },
);
