import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link, Route } from 'react-router-dom';
import Notice from 'src/components/Notice';
import Board from '../router/board';
import variables from '../styles/variables';
import Fab from '../components/Fab';
import newSvg from '../assets/images/new.svg';
import chatSvg from '../assets/images/chat.svg';

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default () => {
  const [showWriteBoard, setShowWriteBoard] = useState(false);

  const WriteBoard = () => (
    <WriteBoardWrapper>
      <Link to="/write/found">분실물 찾아가세요</Link>
      <Link to="/write/lost">분실물 찾아주세요</Link>
      <Link to="/write/market">판매합니다</Link>
    </WriteBoardWrapper>
  );

  return (
    <Container>
      <FloatWrapper>
        {showWriteBoard && <WriteBoard />}
        <Fab onClick={() => setShowWriteBoard(!showWriteBoard)}>
          <Icon src={newSvg} />
        </Fab>
        <Fab>
          <Link to="/chat">
            <Icon src={chatSvg} />
          </Link>
        </Fab>
      </FloatWrapper>
      <Notice title="공지사항" description="서버 점검이 있을 예정입니다" />
      <Route path="/board" component={Board} />
    </Container>
  );
};
