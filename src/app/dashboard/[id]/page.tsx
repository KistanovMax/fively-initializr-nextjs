import React from 'react';

import { Metadata } from 'next';

import { APP_NAME } from '@/constants';
import JobApplicationsPage from '@/views/Dashboard/JobApplicationsPage';

export const metadata: Metadata = {
  title: `${APP_NAME} | Applications`,
};

const Page = () => {
  return <JobApplicationsPage />;
};

export default Page;
