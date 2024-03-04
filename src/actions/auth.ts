'use server';

import * as z from 'zod';

import handleActionError from '@/actions/handleActionError';
import { api } from '@/lib/api';
import { signIn, signOut } from '@/lib/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/lib/routes';
import { LoginSchema, RegisterSchema } from '@/schemas';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn('credentials', { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT });
  } catch (error) {
    return handleActionError(error);
  }
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { email, password, firstName, lastName } = validatedFields.data;

  try {
    await api.post('/auth/register', { email, password, firstName, lastName });
  } catch (error) {
    return handleActionError(error);
  }

  return login({ email, password });
};

export const logout = () => signOut();
