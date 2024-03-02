'use client';

import React, { ReactNode, useMemo } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';

import SocialButton from './SocialButton';

type FormType = 'signIn' | 'signUp';

interface AuthFormWrapperProps {
  children: ReactNode;
  formType: FormType;
  showSocial?: boolean;
}

const AuthFormWrapper = ({ children, formType, showSocial = true }: AuthFormWrapperProps) => {
  const router = useRouter();

  const { title, buttonTitle, buttonHref } = useMemo(() => {
    let title = 'Welcome Back';
    let buttonTitle = `Don't have an account?`;
    let buttonHref = '/register';

    switch (formType) {
      case 'signUp':
        title = 'Join Us';
        buttonTitle = 'Already have an account?';
        buttonHref = '/login';
        break;

      default:
        break;
    }

    return { title, buttonTitle, buttonHref };
  }, [formType]);

  return (
    <Card className="w-full max-w-[500px]">
      <CardHeader className="items-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        {showSocial && (
          <>
            <div className="flex gap-2">
              <SocialButton type="google" />

              <SocialButton type="github" />
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>

              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-2 text-muted-foreground">or continue with email</span>
              </div>
            </div>
          </>
        )}

        {children}
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={() => router.push(buttonHref)}>
          {buttonTitle}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthFormWrapper;
