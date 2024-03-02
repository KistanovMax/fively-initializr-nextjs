import { ReactNode } from 'react';

import AuthLayout from '@/layouts/AuthLayout';

const Layout = ({ children }: { children: ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
