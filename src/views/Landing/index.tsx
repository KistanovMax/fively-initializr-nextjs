'use client';

import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import ApplyJobModal, { ApplyJobFormState } from '@/components/Modals/ApplyJobModal';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import useQueryErrorNotification from '@/hooks/useQueryErrorNotification';
import { Job } from '@/lib/api/types';
import usePublicApi from '@/lib/api/usePublicApi';

const HomePage = () => {
  const { useGetAvailableJobsQuery, useApplyJobMutation } = usePublicApi();

  const { data, isLoading, fetchNextPage, isFetchingNextPage, isError, error } = useGetAvailableJobsQuery();

  const { mutate: applyJob } = useApplyJobMutation();

  useQueryErrorNotification({ isError, error });

  const jobs = data?.pages.map(({ jobs }) => jobs).flat(1) || [];
  const jobsCount = data?.pages[0].count || 0;
  const hasJobs = !!jobs.length;
  const hasMoreJobs = jobs.length < jobsCount;

  const initialApplyPopupState = { open: false, job: {} as Job };

  const [applyPopupState, setApplyPopupState] = useState<{ open: boolean; job: Job }>(initialApplyPopupState);
  const [isMutating, setIsMutating] = useState<boolean>(false);

  const handleOpenPopup = (job: Job) => setApplyPopupState({ open: true, job });

  const handleClosePopup = () => setApplyPopupState(initialApplyPopupState);

  const handleApplyJob = ({ jobId, ...restState }: ApplyJobFormState) => {
    setIsMutating(true);

    applyJob(
      { jobId, body: restState },
      {
        onSuccess: () => {
          handleClosePopup();
          setIsMutating(false);
        },
        onError: () => {
          setIsMutating(false);
        },
      },
    );
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-3xl font-bold">Available Jobs</h2>

        {(isLoading || isFetchingNextPage) && <Spinner label="Loading..." />}
      </div>

      {!isLoading && (
        <>
          {hasJobs ? (
            <InfiniteScroll
              dataLength={jobs.length}
              next={fetchNextPage}
              hasMore={hasMoreJobs}
              loader={null}
              scrollThreshold={0.9}
              scrollableTarget="available_jobs_table"
            >
              <div id="available_jobs_table" className="max-h-[calc(100vh-205px)] overflow-auto relative">
                <Table>
                  <TableHeader className="sticky top-0 bg-background shadow-sm">
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Title</TableHead>

                      <TableHead>Description</TableHead>

                      <TableHead />
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell width="20%">{job.title}</TableCell>

                        <TableCell width="70%">{job.description}</TableCell>

                        <TableCell width="10%" align="center">
                          <Button variant="outline" onClick={() => handleOpenPopup(job)}>
                            Apply
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </InfiniteScroll>
          ) : (
            <p className="text-muted-foreground text-lg">There are no available jobs yet</p>
          )}
        </>
      )}

      {applyPopupState.open && (
        <ApplyJobModal
          {...applyPopupState}
          onOpenChange={handleClosePopup}
          isLoading={isMutating}
          onSubmit={handleApplyJob}
        />
      )}
    </>
  );
};

export default HomePage;
