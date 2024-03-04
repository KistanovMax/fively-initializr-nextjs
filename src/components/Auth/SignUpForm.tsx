'use client';

import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';

import { register } from '@/actions/auth';
import { RegisterSchema } from '@/schemas';

import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

import AuthFormWrapper from './AuthFormWrapper';

const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      register(values).then((res) => !!res?.error && toast.error(res.error));
    });
  });

  return (
    <AuthFormWrapper formType="signUp" showSocial={false}>
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>

                <FormControl>
                  <Input disabled={isPending} placeholder="John" {...field} />
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
                  <Input disabled={isPending} placeholder="Doe" {...field} />
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
                  <Input disabled={isPending} placeholder="john.doe@example.com" type="email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>

                <FormControl>
                  <Input disabled={isPending} placeholder="********" type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button isLoading={isPending} type="submit">
            Create an account
          </Button>
        </form>
      </Form>
    </AuthFormWrapper>
  );
};

export default SignUpForm;
