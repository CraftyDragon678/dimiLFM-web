import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import variables from '../styles/variables';
import SearchBox from '../components/SearchBox';

const Header = styled.div`
  height: 100px;
  border-bottom: 1px solid ${variables.borderColor};
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: white;
  position: sticky;
  top: 0;
`;

const Logo = styled.div`
  font-size: 48px;
  color: ${variables.logoColor};
  font-weight: bold;
  margin-right: 20px;
`;

export default () => (
  <Header>
    <Link to="/"><Logo>L&FM</Logo></Link>
    <SearchBox />
  </Header>
);
