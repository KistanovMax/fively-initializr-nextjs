'use client';

import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { DotsHorizontalIcon, Pencil1Icon, PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

import AddEditJobModal, { AddEditJobFormState } from '@/components/Modals/AddEditJobModal';
import DeleteModal from '@/components/Modals/DeleteModal';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useQueryErrorNotification from '@/hooks/useQueryErrorNotification';
import { Job } from '@/lib/api/types';
import useProtectedApi from '@/lib/api/useProtectedApi';

const JobsPage = () => {
  const router = useRouter();
  const { useGetUserJobsQuery, useAddJobMutation, useUpdateJobMutation, useDeleteJobMutation } = useProtectedApi();

  const { mutate: addNewJob } = useAddJobMutation();

  const { mutate: updateJob } = useUpdateJobMutation();

  const { mutate: deleteJob } = useDeleteJobMutation();

  const { data, isLoading, fetchNextPage, isFetchingNextPage, isError, error } = useGetUserJobsQuery();

  useQueryErrorNotification({
    isError,
    error,
  });

  const jobs = data?.pages.map(({ jobs }) => jobs).flat(1) || [];
  const jobsCount = data?.pages[0].count || 0;
  const hasJobs = !!jobs.length;
  const hasMoreJobs = jobs.length < jobsCount;

  const initialAddEditPopupState = { open: false, formState: { id: undefined, title: '', description: '' } };
  const initialDeletePopupState = { open: false, job: {} as Job };

  const [addEditPopupState, setAddEditPopupState] = useState<{ open: boolean; formState: AddEditJobFormState }>(
    initialAddEditPopupState,
  );
  const [deletePopupState, setDeletePopupState] = useState<{ open: boolean; job: Job }>(initialDeletePopupState);

  const [isMutating, setIsMutating] = useState<boolean>(false);

  const handleOpenAddPopup = () => setAddEditPopupState((prevState) => ({ ...prevState, open: true }));

  const handleOpenEditPopup = (job: Job) => setAddEditPopupState({ open: true, formState: job });

  const handleOpenDeletePopup = (job: Job) => setDeletePopupState({ open: true, job });

  const handleClosePopup = () => {
    setAddEditPopupState(initialAddEditPopupState);
    setDeletePopupState(initialDeletePopupState);
  };

  const handleAddEditJob = ({ id, title, description }: AddEditJobFormState) => {
    const isEdit = !!id;
    const data = { title, description };

    setIsMutating(true);

    const mutateOptions = {
      onSuccess: () => {
        handleClosePopup();
        setIsMutating(false);
      },
      onError: () => {
        setIsMutating(false);
      },
    };

    if (isEdit) {
      updateJob({ id, ...data }, mutateOptions);
    } else {
      addNewJob(data, mutateOptions);
    }
  };

  const handleDeleteJob = (jobId: number) => {
    setIsMutating(true);

    deleteJob(jobId, {
      onSuccess: () => {
        handleClosePopup();
        setIsMutating(false);
      },
      onError: () => {
        setIsMutating(false);
      },
    });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 ">
          <h2 className="text-3xl font-bold">Jobs</h2>

          {(isLoading || isFetchingNextPage) && <Spinner label="Loading..." />}
        </div>

        <Button onClick={handleOpenAddPopup}>
          <PlusIcon />
          <p className="ml-1">Add new</p>
        </Button>
      </div>

      {!isLoading && (
        <>
          {hasJobs ? (
            <InfiniteScroll
              dataLength={jobs.length}
              next={() => fetchNextPage({ cancelRefetch: true })}
              hasMore={hasMoreJobs}
              loader={null}
              scrollThreshold={0.9}
              scrollableTarget="jobs_table"
            >
              <div id="jobs_table" className="max-h-[calc(100vh-165px)] overflow-auto relative">
                <Table>
                  <TableHeader className="sticky top-0 bg-background shadow-sm">
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Title</TableHead>

                      <TableHead>Description</TableHead>

                      <TableHead>Applications</TableHead>

                      <TableHead />
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow
                        key={job.id}
                        className="hover:cursor-pointer"
                        onClick={() => router.push(`/dashboard/${job.id}`)}
                      >
                        <TableCell width="20%">{job.title}</TableCell>

                        <TableCell width="65%">{job.description}</TableCell>

                        <TableCell width="5%" align="center" className="font-bold">
                          {job.applications}
                        </TableCell>

                        <TableCell width="10%" align="right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="icon" className="hover:bg-accent/10">
                                <DotsHorizontalIcon />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Action</DropdownMenuLabel>

                              <DropdownMenuSeparator />

                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenEditPopup(job);
                                }}
                                className="hover:cursor-pointer"
                              >
                                <Pencil1Icon className="mr-2 h-5 w-5" />

                                <span>Edit</span>
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenDeletePopup(job);
                                }}
                                className="hover:cursor-pointer"
                              >
                                <TrashIcon className="mr-2 h-5 w-5" />

                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </InfiniteScroll>
          ) : (
            <p className="text-muted-foreground text-lg">There are no jobs yet</p>
          )}
        </>
      )}

      {addEditPopupState.open && (
        <AddEditJobModal
          {...addEditPopupState}
          onOpenChange={handleClosePopup}
          isLoading={isMutating}
          onSubmit={handleAddEditJob}
        />
      )}

      {deletePopupState.open && (
        <DeleteModal
          {...deletePopupState}
          onOpenChange={handleClosePopup}
          id={deletePopupState.job.id}
          title="Delete Job"
          description={`Are you sure you want to delete "${deletePopupState.job.title || ''}"`}
          isLoading={isMutating}
          onDelete={handleDeleteJob}
        />
      )}
    </>
  );
};

export default JobsPage;
