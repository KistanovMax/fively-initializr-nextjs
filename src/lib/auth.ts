import NextAuth, { DefaultSession } from 'next-auth';

import authConfig from '@/lib/auth.config';

import { UserRole } from './api/types';

declare module 'next-auth' {
  interface User {
    role: UserRole;
    accessToken: string;
  }
  interface Session {
    user: User & DefaultSession['user'];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (!user) return token;

      if (user.role) token.role = user.role;
      if (user.accessToken) token.accessToken = user.accessToken;

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        if (token.sub) session.user.id = token.sub;
        if (token.role) session.user.role = token.role as UserRole;
        if (token.accessToken) session.user.accessToken = token.accessToken as string;
      }

      return session;
    },
  },
  ...authConfig,
});
