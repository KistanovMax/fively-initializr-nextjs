'use client';

import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { Application, ApplyJobBody, JobsResponse } from './types';
import useApiError from './useApiError';

import { api } from '.';

const usePublicApi = () => {
  const { handleError } = useApiError();
  const queryClient = useQueryClient();

  const useGetAvailableJobsQuery = () =>
    useInfiniteQuery({
      queryKey: ['available-jobs'],
      queryFn: async ({ pageParam }): Promise<JobsResponse> => {
        const limit = 12;
        const offset = pageParam * limit;

        return await api.get('/jobs', { params: { limit, offset } }).then(({ data }) => data);
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => lastPageParam + 1,
    });

  const useApplyJobMutation = () =>
    useMutation({
      mutationFn: ({ jobId, body }: { jobId: number; body: ApplyJobBody }): Promise<Application> =>
        api.post(`/applications/${jobId}`, body).then(({ data }) => data),
      onSuccess: () => {
        queryClient.invalidateQueries();

        toast.success('The job was successfully applied');
      },
      onError: (error) => handleError(error as AxiosError),
    });

  return {
    useGetAvailableJobsQuery,
    useApplyJobMutation,
  };
};

export default usePublicApi;
