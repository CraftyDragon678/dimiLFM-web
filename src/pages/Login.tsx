import styled from '@emotion/styled';
import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

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
`;

const LeftCard = styled.div`
  flex: 0 0 400px;
  border-radius: 25px 0 0px 25px;
  background: linear-gradient(to bottom, #ffceee 0%, #76a2e9 70%, #738de9 100%);
  display: grid;
  place-items: center;
  color: white;
  font-size: 100px;
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
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  return (
    <Container>
      <Card>
        <LeftCard>L&FM</LeftCard>
        <RightCard>
          <Input
            value={id}
            onChange={(e) => setId(e.target.value)}
            width="long"
            placeholder="디미고 아이디"
          />
          <Input
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            width="long"
            placeholder="비밀번호"
            type="password"
          />
          <Button size="long">로그인</Button>
        </RightCard>
      </Card>
    </Container>
  );
};
