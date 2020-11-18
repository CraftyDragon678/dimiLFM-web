import React from 'react';
import styled from '@emotion/styled';
import DatePicker from '../components/DatePicker';

const DateWrapper = styled.div`
  width: 800px;
  border-radius: 16px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default () => (
  <DateWrapper>
    <DatePicker />
  </DateWrapper>
);
