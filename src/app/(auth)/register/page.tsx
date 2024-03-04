import { Metadata } from 'next';

import SignUpForm from '@/components/Auth/SignUpForm';
import { APP_NAME } from '@/constants';

export const metadata: Metadata = {
  title: `${APP_NAME} | Sign Up`,
};

const RegisterPage = () => {
  return <SignUpForm />;
};

export default RegisterPage;
