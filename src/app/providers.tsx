'use client';

import React, { ReactNode } from 'react';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

import { Toaster } from '@/components/ui/sonner';
import AccountProvider from '@/providers/AccountProvider';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SessionProvider>
        <AccountProvider>{children}</AccountProvider>
      </SessionProvider>

      <Toaster position="top-right" richColors closeButton />
    </ThemeProvider>
  );
};

export default Providers;
