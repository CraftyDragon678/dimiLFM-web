import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import history from 'src/router/history';
import api from '../api';
import Button from '../components/Button';
import Input from '../components/Input';
import variables from '../styles/variables';
import logo from '../assets/logo-white.svg';

const Container = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

const Card = styled.div`
  width: 750px;
  height: 350px;
  border-radius: 25px;
  background-color: white;
  display: flex;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, .2);

  ${variables.mq[0]} {
    width: 100vw;
    height: auto;
    flex-direction: column;
  }
`;

const LeftCard = styled.div`
  flex: 0 0 350px;
  border-radius: 25px 0 0px 25px;
  background: ${variables.gradient('to bottom')};
  display: grid;
  place-items: center;
  color: white;
  font-size: 80px;
  font-style: italic;

  ${variables.mq[0]} {
    flex: 0 0 250px;
    height: 250px;
    border-radius: 0;
    flex-direction: column;
  }
`;

const RightCard = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
  padding: 70px 35px;

  ${Button} {
    margin-top: 20px;
  }
`;

const Logo = styled.img`
  width: 250px;
`;

export default () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await api.get('/auth/me');
      if (status === 200) {
        history.replace('/');
      }
    })();
  }, []);

  const login = async () => {
    setWrong(false);
    const { status } = await api.post('/auth/login', { id, password: pw });
    setPw('');
    if (status !== 204) {
      setWrong(true);
      return;
    }
    history.replace('/');
  };

  return (
    <Container>
      <Card>
        <LeftCard><Logo src={logo} /></LeftCard>
        <RightCard>
          <Input
            error={wrong}
            value={id}
            onChange={(e) => setId(e.target.value)}
            width="long"
            placeholder="디미고 아이디"
            required
          />
          <Input
            error={wrong}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            width="long"
            placeholder="비밀번호"
            type="password"
            onKeyPress={(e) => e.key === 'Enter' && login()}
            required
          />
          { wrong && <div>가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.</div>}
          <Button size="long" onClick={login}>로그인</Button>
        </RightCard>
      </Card>
    </Container>
  );
};
