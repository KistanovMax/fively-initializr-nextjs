import { Metadata } from 'next';

import SignInForm from '@/components/Auth/SignInForm';
import { APP_NAME } from '@/constants';

export const metadata: Metadata = {
  title: `${APP_NAME} | Login`,
};

const LoginPage = () => {
  return <SignInForm />;
};

export default LoginPage;
