import styled from '@emotion/styled';
import React from 'react';
import variables from 'src/styles/variables';

interface StarsProp {
  value: number;
  size?: number;
  onChange?: (value: number) => void;
}

const Wrapper = styled.div`
  display: flex;
`;

const Star = styled.svg<{enabled: boolean}>`
  fill: ${({ enabled }) => (enabled ? variables.logoColor : 'transparent')};
  stroke: ${({ enabled }) => !enabled && variables.logoColor };
  stroke-width: 2px;
  margin-right: 10px;
`;

const Stars: React.FC<StarsProp> = ({ value, size = 5, onChange }) => (
  <Wrapper>
    {[...Array(size)].map((_, idx) => (
      <Star
        key={idx.toString()}
        version="1.1"
        width="34.7px"
        height="33"
        enabled={idx < value}
        onClick={() => onChange && onChange(idx + 1)}
      >
        <polygon points="17.4,26.8 7.3,32.1 9.2,20.9 1.1,13 12.3,11.3 17.4,1.1 22.4,11.3 33.6,13 25.5,20.9 27.4,32.1" />
      </Star>
    ))}
  </Wrapper>
);

export default Stars;
