'use client';

import React from 'react';

import { DialogProps } from '@radix-ui/react-dialog';

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';

interface DeleteModalProps extends DialogProps {
  id: number;
  title: string;
  description: string;
  isLoading: boolean;
  onDelete: (id: number) => void;
}

const DeleteModal = ({ id, title, description, isLoading, onDelete, ...dialogProps }: DeleteModalProps) => {
  return (
    <Dialog defaultOpen={false} {...dialogProps}>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={() => onDelete(id)} isLoading={isLoading}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
