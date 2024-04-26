import React from 'react';
import './ThemeToggler.scss';
import Moon from '../../assets/icons/moon.svg?react';
import Sun from '../../assets/icons/sun.svg?react';

type Props = {
  value: any;
  onChange: any;
};

export const ThemeToggler: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="toggle-container">
      {value ? (
        <Moon className="moon" onClick={onChange} />
      ) : (
        <Sun className="moon" onClick={onChange} />
      )}
    </div>
  );
};
