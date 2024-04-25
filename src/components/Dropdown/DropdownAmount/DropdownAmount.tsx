import { Dropdown } from '../Dropdown';

interface DropdownAmountProps {
  value: number;
  onChange: (selectedOption: number) => void;
  options: number[];
}

export const DropdownAmount: React.FC<DropdownAmountProps> = ({
  value,
  onChange,
  options,
}) => {
  const handleOptionSelect = (selectedOption: number) => {
    const lastOption = options[options.length - 1];
    onChange(selectedOption === lastOption ? lastOption : selectedOption);
  };

  return (
    <Dropdown
      value={value}
      options={options}
      onChange={handleOptionSelect}
    />
  );
};
