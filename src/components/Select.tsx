import React from 'react';
import styled from '@emotion/styled';
import variables from '../styles/variables';

const Label = styled.label`
  width: 300px;
  height: 30px;
  border: 1px solid ${variables.borderColor};
  padding: 8px;
  box-sizing: border-box;
  border-radius: 8px;
  display: inline-block;
  user-select: none;
  text-align: center;
`;

const SelectElement = styled.select`
  width: 300px;
  height: 30px;
  position: absolute;
  transform: translateY(-30px);
  opacity: 0;
`;

interface SelectProps {
  options: string[];
  index: number;
  onChange: (index: number) => void;
}

const Select: React.FC<SelectProps> = ({ options, index, onChange }) => {
  return (
    <div>
      <Label>{options[index]}</Label>
      <SelectElement onChange={(e) => onChange(+e.target.value)}>
        {options.map((e, idx) => (
          <option key={e} value={idx}>{e}</option>
        ))}
      </SelectElement>
    </div>
  );
};

export default Select;
