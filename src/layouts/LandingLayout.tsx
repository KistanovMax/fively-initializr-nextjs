'use client';

import React, { ReactNode } from 'react';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { DashboardIcon, ExitIcon } from '@radix-ui/react-icons';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { logout } from '@/actions/auth';
import ThemeModeToggle from '@/components/ThemeModeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { APP_NAME } from '@/constants';
import { useAccount } from '@/providers/AccountProvider';

const LandingLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { me } = useAccount();

  return (
    <div className="flex flex-col h-full">
      <header className="static top-0 border-b">
        <div className="container flex items-center justify-between py-3">
          <Link href="/">
            <p className="text-xl font-semibold">{APP_NAME}</p>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeModeToggle />

            {!me ? (
              <Button variant="ghost" onClick={() => router.push('/login')}>
                Login
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-9 h-9 hover:cursor-pointer">
                    <AvatarImage src="" alt={`${me.firstName} ${me.lastName}`} />

                    <AvatarFallback className="text-sm">{`${me.firstName.charAt(0)}${me.lastName.charAt(0)}`}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{me.email}</DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => router.push('/dashboard')} className="hover:cursor-pointer">
                    <DashboardIcon className="mr-2 h-5 w-5" />

                    <span>Dashboard</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => logout()} className="hover:cursor-pointer">
                    <ExitIcon className="mr-2 h-5 w-5" />

                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>

      <div className="container py-6 h-full">{children}</div>

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
