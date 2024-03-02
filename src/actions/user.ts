'use server';

import { auth } from '@/lib/auth';

export const getMe = async () => {
  const session = await auth();

  console.log(session);
};
