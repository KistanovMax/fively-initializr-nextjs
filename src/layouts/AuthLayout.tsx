'use client';

import React, { ReactNode } from 'react';

import { useRouter } from 'next/navigation';
import { IoMdClose } from 'react-icons/io';

import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/constants';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <div className="flex h-full">
      <Button onClick={() => router.push('/')} size="icon" variant="ghost" className="absolute right-6 top-6">
        <IoMdClose size={24} />
      </Button>

      <div className="hidden md:flex flex-1 items-center justify-center bg-foreground text-secondary p-6">
        <p className="text-6xl font-medium text-center">{APP_NAME}</p>
      </div>

      <div className="flex flex-1 p-6">
        <div className="flex items-center justify-center w-full">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
