import { AxiosError } from 'axios';
import { AuthError } from 'next-auth';

export const handleApiError = (error: unknown) => {
  if (error instanceof AuthError) {
    return { error: error.cause?.err?.message };
  }

  if (error instanceof AxiosError) {
    return { error: error.response?.data?.message };
  }

  throw error;
};
