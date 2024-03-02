import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <p className="font-bold text-2xl">Dashboard Layout</p>

      {children}
    </div>
  );
};

export default Layout;
