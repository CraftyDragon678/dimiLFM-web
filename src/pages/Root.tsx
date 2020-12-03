import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link, Route, useLocation } from 'react-router-dom';
import Notice from 'src/components/Notice';
import history from 'src/router/history';
import Button from 'src/components/Button';
import { boardKeys, boardTexts, boardShortTexts } from 'src/types/board';
import Board from '../router/board';
import variables from '../styles/variables';
import Fab from '../components/Fab';
import newSvg from '../assets/images/new.svg';
import chatSvg from '../assets/images/chat.svg';
import { Search } from '.';

const FloatWrapper = styled.div`
  position: fixed;
  z-index: 2;
  right: 24px;
  bottom: 24px;
  display: grid;
  row-gap: 24px;
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
  padding: 8px;
  background-color: white;
  font-size: 20px;

  border: 1px solid ${variables.lightGray};
  border-radius: 8px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, .2);
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PageButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 135px);
  place-content: center;
  margin-top: -40px;
`;

const PageButton = styled(Button)<{enable: boolean}>`
  background-color: white;
  border: ${({ enable }) => enable && `2px solid ${variables.logoColor}`};
  border-bottom: 2px solid ${({ enable }) => (enable ? 'white' : variables.logoColor)};
  z-index: ${({ enable }) => enable && 1};
  border-radius: 10px 10px 0 0;
  color: ${variables.logoColor};
`;

const WriteBoardLink = styled(Link)`
  padding: 8px;
  text-decoration: none;
  color: black;
  :hover {
    background-color: ${variables.lightGray};
  }
`;

export default () => {
  const [showWriteBoard, setShowWriteBoard] = useState(false);
  const location = useLocation();

  const WriteBoard = () => (
    <WriteBoardWrapper>
      {boardKeys.map((e) => (
        <WriteBoardLink to={`/write/${e}`} key={e}>
          {boardTexts[e]}
        </WriteBoardLink>
      ))}
    </WriteBoardWrapper>
  );

  const BoardPageButton: React.FC<{href: string}> = ({ href, children }) => (
    <PageButton
      enable={location.pathname === `/board/${href}`}
      onClick={() => history.push(`/board/${href}`)}
    >
      {children}
    </PageButton>
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
      {/board\/[^/]+\/?$/.test(history.location.pathname) && (
        <>
          <Notice title="공지사항" description="서버 점검이 있을 예정입니다" />
          <PageButtonWrapper>
            {boardKeys.map((e) => (
              <BoardPageButton href={e} key={e}>
                {boardShortTexts[e]}
              </BoardPageButton>
            ))}
          </PageButtonWrapper>
        </>
      )}
      <Route path="/board" component={Board} />
      <Route path="/search/:query" component={Search} />
    </Container>
  );
};
