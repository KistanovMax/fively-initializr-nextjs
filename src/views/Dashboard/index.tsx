'use client';

import React from 'react';

import { useSession } from 'next-auth/react';

import { logout } from '@/actions/auth';
import { Button } from '@/components/ui/button';

const DashboardPage = () => {
  const { data: session } = useSession();

  return (
    <div className="p-10">
      <p className="font-bold text-2xl">Dashboard Page</p>

      <pre>
        CURRENT USER:
        {JSON.stringify(session?.user, null, 2)}
      </pre>

      <Button onClick={() => logout()}>Log Out</Button>
    </div>
  );
};

export default DashboardPage;
