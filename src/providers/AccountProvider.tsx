import React, { useMemo, createContext, ReactNode, useContext, useEffect } from 'react';

import { User } from 'next-auth';
import { useSession } from 'next-auth/react';

import { getMe } from '@/actions/user';
import Spinner from '@/components/Spinner';

interface AccountContextProps {
  me: User | null;
}

const defaultValue = {
  me: null,
};

const AccountContext = createContext<AccountContextProps>(defaultValue);

AccountContext.displayName = 'AccountContext';

const AccountProvider = ({ children }: { children: ReactNode }) => {
  const session = useSession();

  const me = null;

  useEffect(() => {
    getMe();
  }, []);

  const value: AccountContextProps = useMemo(() => ({ me }), [me]);

  if (session.status === 'loading') {
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
