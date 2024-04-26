import React from 'react';
import Moon from '../../assets/icons/moon.svg?react';
import Sun from '../../assets/icons/sun.svg?react';

type Props = {
  value: any;
  onChange: any;
  className: string;
};

export const ThemeToggler: React.FC<Props> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <div className={className} onClick={onChange}>
      {value ? <Moon className="moon" /> : <Sun className="moon" />}
    </div>
  );
};
