'use client';

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { AddJobBody, ApplicationsResponse, Job, JobsResponse, UpdateJobBody, User } from './types';
import useApiError from './useApiError';

import { protectedApi } from '.';

const useProtectedApi = () => {
  const { handleError } = useApiError();
  const queryClient = useQueryClient();

  const useGetMeQuery = ({ enabled }: { enabled: boolean }) =>
    useQuery({
      queryKey: ['me'],
      enabled,
      queryFn: (): Promise<User> => protectedApi.get('/me').then(({ data }) => data),
    });

  const useGetUserJobByIdQuery = (jobId: number | null) =>
    useQuery({
      queryKey: ['jobs', jobId],
      enabled: !!jobId,
      queryFn: (): Promise<Job> => protectedApi.get(`/jobs/${jobId}`).then(({ data }) => data),
    });

  const useGetUserJobsQuery = () =>
    useInfiniteQuery({
      queryKey: ['jobs'],
      queryFn: async ({ pageParam }): Promise<JobsResponse> => {
        const limit = 12;
        const offset = pageParam * limit;

        return await protectedApi.get('/jobs/user-jobs', { params: { limit, offset } }).then(({ data }) => data);
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => lastPageParam + 1,
    });

  const useAddJobMutation = () =>
    useMutation({
      mutationFn: (body: AddJobBody): Promise<Job> => protectedApi.post(`/jobs`, body).then(({ data }) => data),
      onSuccess: () => {
        queryClient.invalidateQueries();

        toast.success('The job was successfully added');
      },
      onError: (error) => handleError(error as AxiosError),
    });

  const useDeleteJobMutation = () =>
    useMutation({
      mutationFn: (jobId: number): Promise<Job> => protectedApi.delete(`/jobs/${jobId}`).then(({ data }) => data),
      onSuccess: () => {
        queryClient.invalidateQueries();

        toast.success('The job was successfully deleted');
      },
      onError: (error) => handleError(error as AxiosError),
    });

  const useUpdateJobMutation = () =>
    useMutation({
      mutationFn: (body: UpdateJobBody): Promise<Job> => protectedApi.put(`/jobs`, body).then(({ data }) => data),
      onSuccess: () => {
        queryClient.invalidateQueries();

        toast.success('The job was successfully updated');
      },
      onError: (error) => handleError(error as AxiosError),
    });

  const useGetApplicationsByJobIdQuery = (jobId: number) =>
    useInfiniteQuery({
      queryKey: ['job-applications', jobId],
      queryFn: async ({ pageParam }): Promise<ApplicationsResponse> => {
        const limit = 12;
        const offset = pageParam * limit;

        return await protectedApi.get(`/applications/${jobId}`, { params: { limit, offset } }).then(({ data }) => data);
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => lastPageParam + 1,
    });

  return {
    useGetMeQuery,
    useGetUserJobsQuery,
    useGetUserJobByIdQuery,
    useAddJobMutation,
    useDeleteJobMutation,
    useUpdateJobMutation,
    useGetApplicationsByJobIdQuery,
  };
};

export default useProtectedApi;
