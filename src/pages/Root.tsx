import React, { useState } from 'react';
import styled from '@emotion/styled';
import variables from '../styles/variables';
import Gallery from '../components/Gallery';
import Options from '../components/Options';
import Fab from '../components/Fab';
import newSvg from '../assets/images/new.svg';
import chatSvg from '../assets/images/chat.svg';
import { Link } from 'react-router-dom';
import { Bon as Map } from '../components/Map';

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
  position: absolute;
  right: 100px;
  bottom: 130px;
  width: 180px;
  padding: 16px;
  background-color: white;
  font-size: 20px;

  border: 1px solid ${variables.lightGray};
  border-radius: 8px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, .2);
  display: grid;
  grid-row-gap: 12px;

  a {
    text-decoration: none;
    color: black;
  }
`;

export default () => {
  const [showWriteBoard, setShowWriteBoard] = useState(false);

  const WriteBoard = () => (
    <WriteBoardWrapper>
      <Link to="/write/find">분실물 찾아가세요</Link>
      <Link to="/write/lost">분실물 찾아주세요</Link>
      <Link to="/write/market">판매합니다</Link>
    </WriteBoardWrapper>
  );

  return (
    <div>
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
      <Map />
    </div>
  );
};
