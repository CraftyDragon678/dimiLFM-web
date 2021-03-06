import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import variables from '../styles/variables';
import SearchBox from './SearchBox';
import logo from '../assets/logo.svg';
import Profile from './Profile';

const Header = styled.div`
  height: 100px;
  border-bottom: 1px solid ${variables.borderColor};
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: white;
  position: sticky;
  top: 0;

  z-index: 10;

  ${variables.mq[0]} {
    position: static;
    height: 150px;
    padding-top: 20px;
    align-items: flex-start;
  }
`;

const Logo = styled.img`
  margin-right: 20px;
  width: 150px;

  ${variables.mq[0]} {
    position: absolute;
    left: 20px;
  }
`;

export default () => (
  <Header>
    <Link to="/"><Logo src={logo} /></Link>
    <SearchBox />
    <Profile />
  </Header>
);
