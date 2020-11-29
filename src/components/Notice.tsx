import styled from '@emotion/styled';
import React from 'react';
import variables from 'src/styles/variables';

interface NoticeProps {
  title: string;
  description: string;
}

const Wrapper = styled.div`
  height: 200px;
  background-color: #b0b4fe;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 50px;
  z-index: -2;
`;

const Title = styled.div`
  font-size: 60px;
  color: white;
  margin-bottom: 20px;

  ::after {
    content: "";
    border-bottom: 8px solid ${variables.logoColor};
    display: block;
    position: relative;
    top: -10px;
    z-index: -1;
  }
`;

const Description = styled.div`
  font-size: 30px;
  color: white;
`;

const Notice: React.FC<NoticeProps> = ({ title, description }) => (
  <Wrapper>
    <Title>{title}</Title>
    <Description>{description}</Description>
  </Wrapper>
);

export default Notice;
