'use client';

import React, { useMemo, createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

import Spinner from '@/components/Spinner';
import { User } from '@/lib/api/types';
import useProtectedApi from '@/lib/api/useProtectedApi';

interface AccountContextProps {
  me: User | null;
  session: Session | null;
}

const defaultValue = {
  me: null,
  session: null,
};

const AccountContext = createContext<AccountContextProps>(defaultValue);

AccountContext.displayName = 'AccountContext';

const AccountProvider = ({ children }: { children: ReactNode }) => {
  const { useGetMeQuery } = useProtectedApi();

  const [isLoadingSession, setIsLoadingSession] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(defaultValue.session);

  const { data: me = null, isLoading } = useGetMeQuery({ enabled: !!session });

  const value: AccountContextProps = useMemo(() => ({ me, session }), [me, session]);

  useEffect(() => {
    const getAuthSession = async () => {
      setIsLoadingSession(true);

      setSession(await getSession().finally(() => setIsLoadingSession(false)));
    };

    getAuthSession();
  }, []);

  if (isLoadingSession || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner label="Loading..." labelClassName="text-xl" size={24} />
      </div>
    );
  }

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
};

export const useAccount = (): AccountContextProps => useContext(AccountContext);

export default AccountProvider;
