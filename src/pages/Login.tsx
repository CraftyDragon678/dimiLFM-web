import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import api from '../api';
import Button from '../components/Button';
import Input from '../components/Input';
import variables from '../styles/variables';

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
`;

const LeftCard = styled.div`
  flex: 0 0 300px;
  border-radius: 25px 0 0px 25px;
  background: ${variables.gradient('to bottom')};
  display: grid;
  place-items: center;
  color: white;
  font-size: 80px;
  font-style: italic;
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

export default () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [wrong, setWrong] = useState(false);
  const history = useHistory();

  const login = async () => {
    setWrong(false);
    const { status } = await api.post('/auth/login', { id, password: pw });
    setPw('');
    if (status !== 204) {
      setWrong(true);
      return;
    }
    history.push('/');
  };

  return (
    <Container>
      <Card>
        <LeftCard>L&FM</LeftCard>
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
