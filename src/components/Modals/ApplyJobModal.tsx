'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { DialogProps } from '@radix-ui/react-dialog';
import * as z from 'zod';

import { Job } from '@/lib/api/types';
import { ApplyJobSchema } from '@/schemas';

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export type ApplyJobFormState = z.infer<typeof ApplyJobSchema>;

interface ApplyJobModalProps extends DialogProps {
  job: Job;
  isLoading: boolean;
  onSubmit: (state: ApplyJobFormState) => void;
}

const ApplyJobModal = ({ job, isLoading, onSubmit, ...dialogProps }: ApplyJobModalProps) => {
  const form = useForm<ApplyJobFormState>({
    mode: 'onSubmit',
    resolver: zodResolver(ApplyJobSchema),
    defaultValues: {
      jobId: job.id,
      firstName: '',
      lastName: '',
      email: '',
      text: '',
    },
  });

  const onSubmitForm = form.handleSubmit((state) => {
    onSubmit(state);
  });

  return (
    <Dialog defaultOpen={false} {...dialogProps}>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Apply Job ({job.title})</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>

                <FormControl>
                  <Input disabled={isLoading} placeholder="John" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>

                <FormControl>
                  <Input disabled={isLoading} placeholder="Doe" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input disabled={isLoading} placeholder="john.doe@example.com" type="email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>

                <FormControl>
                  <Textarea rows={5} disabled={isLoading} {...field} placeholder="Type your message here." />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button onClick={onSubmitForm} isLoading={isLoading}>
              Apply
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyJobModal;
