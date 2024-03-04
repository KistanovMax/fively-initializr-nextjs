'use client';

import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useParams } from 'next/navigation';

import Spinner from '@/components/Spinner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useQueryErrorNotification from '@/hooks/useQueryErrorNotification';
import useProtectedApi from '@/lib/api/useProtectedApi';

const JobApplicationsPage = () => {
  const params = useParams();

  const { useGetUserJobByIdQuery, useGetApplicationsByJobIdQuery } = useProtectedApi();

  const {
    data: job,
    error: jobError,
    isLoading: isLoadingJob,
    isError: isErrorJob,
  } = useGetUserJobByIdQuery(+params.id);

  const {
    data,
    error: applicationsError,
    isLoading: isLoadingApplications,
    isError: isErrorApplications,
    fetchNextPage: fetchNextApplicationsPage,
    isFetchingNextPage: isFetchingNexApplicationsPage,
  } = useGetApplicationsByJobIdQuery(+params.id);

  const applications = data?.pages.map(({ applications }) => applications).flat(1) || [];
  const applicationsCount = data?.pages[0].count || 0;
  const hasApplications = !!applications.length;
  const hasMoreApplications = applications.length < applicationsCount;

  useQueryErrorNotification({
    isError: isErrorJob,
    error: jobError,
  });

  useQueryErrorNotification({
    isError: isErrorApplications,
    error: applicationsError,
  });

  return (
    <>
      {isLoadingJob || isLoadingApplications ? (
        <div className="flex items-center justify-center h-full">
          <Spinner label="Loading..." labelClassName="text-xl" size={24} />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-3xl font-bold">Applications ({job?.title})</h2>

            {isFetchingNexApplicationsPage && <Spinner label="Loading..." />}
          </div>
          <>
            {hasApplications ? (
              <InfiniteScroll
                dataLength={applications.length}
                next={fetchNextApplicationsPage}
                hasMore={hasMoreApplications}
                loader={null}
                scrollThreshold={0.9}
                scrollableTarget="job_applications_table"
              >
                <div id="job_applications_table" className="max-h-[calc(100vh-165px)] overflow-auto relative">
                  <Table>
                    <TableHeader className="sticky top-0 bg-background shadow-sm">
                      <TableRow className="hover:bg-transparent">
                        <TableHead>Name</TableHead>

                        <TableHead>Email</TableHead>

                        <TableHead>Text</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {applications.map(({ id, firstName, lastName, email, text }) => (
                        <TableRow key={id}>
                          <TableCell width="20%" className="min-h-[53px]">
                            {firstName} {lastName}
                          </TableCell>

                          <TableCell width="20%">{email}</TableCell>

                          <TableCell width="60%">{text}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </InfiniteScroll>
            ) : (
              <p className="text-muted-foreground text-lg">There are no applications yet</p>
            )}
          </>
        </>
      )}
    </>
  );
};

export default JobApplicationsPage;
