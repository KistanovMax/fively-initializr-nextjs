import { ReactNode } from 'react';

import DashboardLayout from '@/layouts/DashboardLayout';

const Layout = ({ children }: { children: ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
