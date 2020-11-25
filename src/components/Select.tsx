import React from 'react';
import styled from '@emotion/styled';
import variables from '../styles/variables';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

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
  opacity: 0;
`;

interface SelectProps {
  options: string[];
  index: number;
  onChange: (index: number) => void;
}

const Select: React.FC<SelectProps> = ({ options, index, onChange }) => {
  return (
    <Container>
      <Label>{options[index]}</Label>
      <SelectElement value={index} onChange={(e) => onChange(+e.target.value)}>
        {options.map((e, idx) => (
          <option key={e} value={idx}>{e}</option>
        ))}
      </SelectElement>
    </Container>
  );
};

export default Select;
