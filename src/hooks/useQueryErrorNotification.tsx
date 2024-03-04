import { useEffect } from 'react';

import { AxiosError } from 'axios';
import { toast } from 'sonner';

interface ErrorNotificationProps {
  isError: boolean;
  error: Error | null;
}

const useQueryErrorNotification = ({ isError, error }: ErrorNotificationProps) => {
  useEffect(() => {
    if (isError && error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    }
  }, [error, isError]);
};

export default useQueryErrorNotification;
