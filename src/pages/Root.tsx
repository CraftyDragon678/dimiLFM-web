import React, { useState } from 'react';
import styled from '@emotion/styled';
import variables from '../styles/variables';
import SearchBox from '../components/SearchBox';
import Gallery from '../components/Gallery';
import ToggleButton from '../components/ToggleButton';
import Options from '../components/Options';
import Fab from '../components/Fab';
import newSvg from '../assets/images/new.svg';
import chatSvg from '../assets/images/chat.svg';

const Header = styled.div`
  height: 100px;
  border-bottom: 1px solid ${variables.borderColor};
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: white;
`;

const Logo = styled.div`
  font-size: 48px;
  color: ${variables.logoColor};
  font-weight: bold;
  margin-right: 20px;
`;

const FloatWrapper = styled.div`
  position: fixed;
  right: 24px;
  bottom: 24px;
  display: grid;
  grid-row-gap: 24px;
`;

const Icon = styled.img`
  width: 48px;
  height: 48px;
`;

const WriteBoardWrapper = styled.div`
  width: 200px;
  padding: 16px;
  background-color: white;

  border: 1px solid ${variables.lightGray};
  border-radius: 8px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, .2);
  display: grid;
`;

export default () => {
  const [showWriteBoard, setShowWriteBoard] = useState(false);

  const WriteBoard = () => (
    <WriteBoardWrapper>
      <div>분실물 찾아가세요</div>
      <div>분실물 찾아주세요</div>
      <div>판매합니다</div>
    </WriteBoardWrapper>
  );

  return (
    <div>
      <Header>
        <Logo>L&FM</Logo>
        <SearchBox />
      </Header>
      <Options />
      <FloatWrapper>
        {showWriteBoard && <WriteBoard />}
        <Fab onClick={() => setShowWriteBoard(!showWriteBoard)}>
          <Icon src={newSvg} />
        </Fab>
        <Fab>
          <Icon src={chatSvg} />
        </Fab>
      </FloatWrapper>
      <Gallery />
    </div>
  );
};
