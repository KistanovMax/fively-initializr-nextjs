import { ReactNode } from 'react';

import LandingLayout from '@/layouts/LandingLayout';

const Layout = ({ children }: { children: ReactNode }) => {
  return <LandingLayout>{children}</LandingLayout>;
};

export default Layout;
