'use client';

import React, { ReactNode } from 'react';

import moment from 'moment';
import { useRouter } from 'next/navigation';

import ThemeModeToggle from '@/components/ThemeModeToggle';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/constants';

const LandingLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full">
      <header className="static top-0 border-b">
        <div className="container flex items-center justify-between py-3">
          <p className="text-xl font-semibold">{APP_NAME}</p>

          <div className="flex items-center gap-1">
            <ThemeModeToggle />

            <Button variant="ghost" onClick={() => router.push('/login')}>
              Login
            </Button>
          </div>
        </div>
      </header>

      <div className="container flex flex-1 items-center justify-center">{children}</div>

      <footer className="border-t">
        <div className="container py-3">
          <p className="text-xs text-center">
            © {moment().format('YYYY')} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingLayout;
