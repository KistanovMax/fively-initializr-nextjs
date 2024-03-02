'use client';

import React from 'react';

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '../ui/button';

interface SocialButtonProps {
  type: 'google' | 'github';
}

const SocialButton = ({ type }: SocialButtonProps) => {
  const handleClick = () => {};

  return (
    <Button className="w-full gap-2" variant="outline" onClick={handleClick}>
      {type === 'google' ? <FcGoogle size={24} /> : <FaGithub size={24} />}

      <p>{type === 'google' ? 'Google' : 'GitHub'}</p>
    </Button>
  );
};

export default SocialButton;
