'use client';

import { useCallback } from 'react';

import { AxiosError } from 'axios';
import { toast } from 'sonner';

const useApiError = () => {
  const handleError = useCallback((error: Error) => {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message);
    }
  }, []);

  return { handleError };
};

export default useApiError;
