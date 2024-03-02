import React, { ComponentProps } from 'react';

import { ImSpinner8 } from 'react-icons/im';

interface SpinnerProps {
  size?: number;
  label?: string;
  labelClassName?: ComponentProps<'p'>['className'];
}

const Spinner = ({ size = 18, label = '', labelClassName = '' }: SpinnerProps) => {
  return (
    <div className="flex items-center gap-2">
      <ImSpinner8 size={size} className="animate-spin" />
      {!!label && <p className={labelClassName}>{label}</p>}
    </div>
  );
};

export default Spinner;
