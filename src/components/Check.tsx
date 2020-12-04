import styled from '@emotion/styled';
import React from 'react';
import variables from 'src/styles/variables';
import checkSvg from '../assets/images/check.svg';

interface CheckProps {
  value: number[];
  names: string[];
  onChange: (value: number[]) => void;
}

const Wrapper = styled.div`
  display: grid;
  row-gap: 10px;
`;

const Circle = styled.div<{selected: boolean}>`
  width: 18px;
  height: 18px;
  border: 1px solid ${variables.borderColor};
  margin-right: 16px;
  display: flex;
  
  ::after {
    content: "";
    width: 100%;
    height: 100%;
    background: center / 80% no-repeat url(${checkSvg});
    display: block;
  }
`;

const Box = styled.div`
  display: flex;
  cursor: pointer;
`;

const Check: React.FC<CheckProps> = ({ value, names, onChange }) => (
  <Wrapper>
    {names.map((e, idx) => (
      <Box
        key={e}
        onClick={() => (
          onChange(value.includes(idx) ? value.filter((e) => e !== idx) : [...value, idx])
        )}
      >
        <Circle selected={value.includes(idx)} />
        {e}
      </Box>
    ))}
  </Wrapper>
);

export default Check;
