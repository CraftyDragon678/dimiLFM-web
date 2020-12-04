import styled from '@emotion/styled';
import React from 'react';
import variables from 'src/styles/variables';

interface RadioProps {
  value: number;
  names: string[];
  onChange: (value: number) => void;
}

const Wrapper = styled.div`
  display: grid;
  row-gap: 10px;
`;

const Circle = styled.div<{selected: boolean}>`
  width: 18px;
  height: 18px;
  border: 1px solid ${variables.borderColor};
  border-radius: 9px;
  margin-right: 16px;
  
  ::after {
    content: "";
    width: 10px;
    height: 10px;
    background-clip: content-box;
    background-color: ${({ selected }) => selected && 'black'};
    border: 4px solid transparent;
    border-radius: 9px;
    display: block;
  }
`;

const Content = styled.div`
  display: flex;
  cursor: pointer;
`;

const Radio: React.FC<RadioProps> = ({ value, names, onChange }) => {
  return (
    <Wrapper>
      {names.map((e, idx) => (
        <Content key={e} onClick={() => onChange(idx)}>
          <Circle selected={idx === value} />
          {e}
        </Content>
      ))}
    </Wrapper>
  );
};

export default Radio;
