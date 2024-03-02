import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().min(1, { message: 'Email is reqiured' }).email(),
  password: z.string().min(8, { message: 'Password must contain at least 8 characters' }),
});

export const RegisterSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().min(1, { message: 'Email is reqiured' }).email(),
  password: z.string().min(8, { message: 'Password must contain at least 8 characters' }),
});
