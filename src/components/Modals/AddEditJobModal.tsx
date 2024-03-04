'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { DialogProps } from '@radix-ui/react-dialog';
import * as z from 'zod';

import { AddEditJobSchema } from '@/schemas';

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export type AddEditJobFormState = z.infer<typeof AddEditJobSchema>;

interface AddEditJobModalProps extends DialogProps {
  formState: AddEditJobFormState;
  isLoading: boolean;
  onSubmit: (state: AddEditJobFormState) => void;
}

const AddEditJobModal = ({ formState, isLoading, onSubmit, ...dialogProps }: AddEditJobModalProps) => {
  const form = useForm<AddEditJobFormState>({
    mode: 'onSubmit',
    resolver: zodResolver(AddEditJobSchema),
    defaultValues: {
      id: formState.id,
      title: formState.title,
      description: formState.description,
    },
  });

  const onSubmitForm = form.handleSubmit((state) => {
    onSubmit(state);
  });

  return (
    <Dialog defaultOpen={false} {...dialogProps}>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{formState.id ? 'Edit' : 'Add New'} Job</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>

                <FormControl>
                  <Input disabled={isLoading} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>

                <FormControl>
                  <Textarea rows={5} disabled={isLoading} {...field} placeholder="Type your message here." />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button onClick={onSubmitForm} isLoading={isLoading}>
              Save
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditJobModal;
