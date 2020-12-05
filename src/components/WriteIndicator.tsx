import styled from '@emotion/styled';
import React from 'react';
import variables from 'src/styles/variables';

interface WriteIndicatorProps {
  index: number;
  stage: string[];
}

const Wrapper = styled.div`
  display: flex;
  margin-top: -25px;
`;

const Circle = styled.div<{selected: boolean}>`
  height: 32px;
  width: 32px;
  border: 3px solid white;
  border-radius: 16px;
  box-sizing: border-box;
  display: grid;
  place-items: center;
  color: ${({ selected }) => (selected ? variables.blue : 'transparent')};
  background-color: ${({ selected }) => selected && 'white'};
  font-size: 20px;
  position: relative;

  ::after {
    content: attr(data-tag);
    position: absolute;
    transform: translateY(40px);
    font-size: 20px;
    color: white;
    text-align: center;
    width: 100px;
  }
`;

const Bar = styled.div`
  width: 100px;
  height: 16px;
  border-bottom: 3px solid white;
`;

const WriteIndicator: React.FC<WriteIndicatorProps> = ({ index, stage }) => {
  return (
    <Wrapper>
      {stage.map<React.ReactNode>((e, idx) => (
        <Circle key={e} selected={index === idx} data-tag={e}>{idx + 1}</Circle>
      )).reduce((prev, curr) => (
        [prev, <Bar />, curr]
      ))}
      {/* <Circle selected={false}>1</Circle>
      <Bar />
      <Circle selected>2</Circle>
      <Bar />
      <Circle selected>3</Circle>
      <Bar />
      <Circle selected>4</Circle> */}
    </Wrapper>
  );
};

export default WriteIndicator;
