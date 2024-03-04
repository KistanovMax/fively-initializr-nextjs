'use client';

import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import * as z from 'zod';

import { login } from '@/actions/auth';
import { Input } from '@/components/ui/input';
import { LoginSchema } from '@/schemas';

import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

import AuthFormWrapper from './AuthFormWrapper';

const SignInForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      login(values).then((res) => !!res?.error && toast.error(res.error));
    });
  });

  return (
    <AuthFormWrapper formType="signIn" showSocial={false}>
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
            Login
          </Button>
        </form>
      </Form>
    </AuthFormWrapper>
  );
};

export default SignInForm;
