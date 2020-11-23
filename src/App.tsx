import React from 'react';
import Router from './router';

import './styles/reset.css';
import './styles/index.css';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default () => (
  <Wrapper>
    <Router />
  </Wrapper>
);
