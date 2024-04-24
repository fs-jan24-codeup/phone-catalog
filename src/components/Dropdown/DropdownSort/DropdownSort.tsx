import React from 'react';
import { Dropdown } from '../Dropdown';
import { Sort } from '../../../types/Sort';

interface DropdownSortProps {
  value: Sort;
  onChange: (selectedOption: Sort) => void;
  options: Sort[];
}

export const DropdownSort: React.FC<DropdownSortProps> = ({
  value,
  onChange,
  options,
}) => {
  const handleOptionSelect = (selectedOption: Sort) => {
    onChange(selectedOption);
  };

  return (
    <Dropdown
      value={value}
      options={options}
      onChange={handleOptionSelect}
    />
  );
};