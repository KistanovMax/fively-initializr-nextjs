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

export const ApplyJobSchema = z.object({
  jobId: z.number(),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().min(1, { message: 'Email is reqiured' }).email(),
  text: z.string().min(1, { message: 'Text is required' }),
});

export const AddEditJobSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, { message: 'First name is required' }),
  description: z.string().min(1, { message: 'Last name is required' }),
});
