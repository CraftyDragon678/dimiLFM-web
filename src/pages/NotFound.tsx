import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import history from '../router/history';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #eb3e2f;

  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;

  z-index: 20;
`;

const BigText = styled.div`
  margin: 40px;
  font-size: 200px;
  color: white;
`;

const SmallText = styled.div`
  font-size: 40px;
  color: white;
`;

const Home = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Row = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;

  ${Button} {
    font-size: 50px;
    width: 200px;
    height: 80px;
  }
`;

export default () => (
  <Container>
    <BigText>404</BigText>
    <SmallText>이런! 보성이가 아직 개발 안 했어요</SmallText>
    <Row>
      <Home to="/"><Button>홈으로</Button></Home>
      <Button onClick={() => history.goBack()}>이전</Button>
    </Row>
  </Container>
);
