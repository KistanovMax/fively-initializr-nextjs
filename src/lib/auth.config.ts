import { AxiosError } from 'axios';
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { LoginSchema } from '@/schemas';

import { api } from './api';

export default {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;

        try {
          const { data } = await api.post('/auth/login', { email, password });

          return data;
        } catch (error) {
          if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message);
          }
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
