import React from 'react';

import { Metadata } from 'next';

import { APP_NAME } from '@/constants';
import JobsPage from '@/views/Dashboard';

export const metadata: Metadata = {
  title: `${APP_NAME} | Jobs`,
};

const Page = () => {
  return <JobsPage />;
};

export default Page;
