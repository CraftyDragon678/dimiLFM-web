import styled from '@emotion/styled';
import React, { useState } from 'react';
import { SubTitle } from 'src/components/Text';
import variables from 'src/styles/variables';
import api from '../api';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  background-color: white;
`;

const ListContainer = styled.div`
  width: 300px;
`;

const ListText = styled(SubTitle)`
  padding: 30px 50px 0 50px;
`;

const UserWrapper = styled.div<{enable: boolean}>`
  display: flex;
  align-items: center;
  padding: 10px 50px;
  border-radius: 10px 0 0 10px;
  background-color: ${({ enable }) => enable && variables.lightPurple};
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border: 1px solid ${variables.borderColor};
  border-radius: 25px;
  margin-right: 10px;
`;

const UserName = styled.div`
  > span {
    :first-of-type {
      font-size: 18px;
    }
    :last-of-type {
      font-size: 10px;
    }
  }
  > div {
    color: #999;
    font-size: 14px;
    margin-top: 4px;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid ${variables.purple};

  > div:first-of-type {
    flex: 1;
  }
`;

const InputContainer = styled.div`
  background-color: ${variables.lightGray};
  display: flex;
  padding: 10px;
  height: 50px;
`;

const Input = styled.input`
  background-color: ${variables.lighterGray};
  flex: 1;
  padding: 20px;
  font-size: 18px;
  border: none;
  border-radius: 100px;
`;

const SendButton = styled.button`
  background-color: ${variables.logoColor};
  border: none;
  margin-left: 10px;
  width: 80px;
  border-radius: 100px;
`;

export default () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = () => {
    setMessage('');
  };

  return (
    <Container>
      <ListContainer>
        <ListText>목록</ListText>
        {['정품 키즈패딩', '맥북 프로', '장차드', '고급', '리보솜'].map((e, idx) => (
          <UserWrapper key={e} enable={idx === 2}>
            <UserImage src="https://via.placeholder.com/25" />
            <UserName>
              <span>{e}</span>
              <span>(홍다우)</span>
              <div>
                저 이거 갖고싶어요
              </div>
            </UserName>
          </UserWrapper>
        ))}
      </ListContainer>
      <MessageContainer>
        <div>
          {messages.map((e) => (
            <div>{e}</div>
          ))}
        </div>
        <InputContainer>
          <Input
            placeholder="메시지를 입력하세요..."
            onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <SendButton />
        </InputContainer>
      </MessageContainer>
    </Container>
  );
};
