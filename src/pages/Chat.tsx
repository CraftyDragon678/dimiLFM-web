import styled from '@emotion/styled';
import React, {
  useEffect, useReducer, useRef, useState,
} from 'react';
import api from 'src/api';
import { SubTitle } from 'src/components/Text';
import socket from 'src/socket';
import variables from 'src/styles/variables';
import { User } from 'src/types/user';
import { getUserDisplayText } from 'src/utils/user';
import userIcon from '../assets/images/user.svg';

const Container = styled.div`
  width: 100%;
  display: flex;
  background-color: white;
`;

const ListContainer = styled.div`
  flex: 0 300px;
  width: 0;
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
  object-fit: contain;
  object-position: center;
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
  flex: 1;
  width: 0;
  display: flex;
  flex-direction: column;
  border: 2px solid ${variables.purple};
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

const Messages = styled.div`
  flex: 1 0px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Chat = styled.div`
  padding: 10px 15px;
  margin-bottom: 2px;
  max-width: 80%;
  line-break: anywhere;
`;

const MyChat = styled(Chat)`
  align-self: flex-end;
  background-color: ${variables.logoColor};
  color: white;
  border-radius: 20px 20px 0 20px;

  & + & {
    border-top-right-radius: 0;
  }
`;

const OtherChat = styled(Chat)`
  align-self: flex-start;
  padding: 10px 15px;
  margin-bottom: 2px;
  background-color: ${variables.lightGray};
  border-radius: 20px 20px 20px 0;

  & + & {
    border-top-left-radius: 0;
  }
`;

interface ChatData {
  type: string;
  message: string;
  mine: boolean;
}

type Action = { type: 'ADD_MINE', messageType: string, message: string }
  | { type: 'ADD_OTHER', messageType: string, message: string };

interface ChatRoom {
  user: User;
  lastMessage: string;
  _id: string;
  title: string;
}

export default () => {
  const [message, setMessage] = useState('');
  const [messages, dispatchMessages] = useReducer((state: ChatData[], action: Action) => {
    switch (action.type) {
      case 'ADD_MINE':
        return [...state, {
          type: action.messageType,
          message: action.message,
          mine: true,
        }];
      case 'ADD_OTHER':
        return [...state, {
          type: action.messageType,
          message: action.message,
          mine: false,
        }];
      default:
        return state;
    }
  }, []);
  const messageContainerEl = useRef<HTMLDivElement>(null);
  const [list, setList] = useState<ChatRoom[]>([]);

  useEffect(() => {
    socket.on('message', receiveMessage);
    return () => {
      socket.off('message', receiveMessage);
    };
  }, []);

  useEffect(() => {
    let canceled = false;
    (async () => {
      const { status, data } = await api.get('/chat/list');
      if (status !== 200) return;

      if (!canceled) {
        setList(data);
      }
    })();

    return () => {
      canceled = true;
    };
  }, []);

  useEffect(() => {
    if (messageContainerEl.current) {
      const el = messageContainerEl.current;
      if (el.scrollHeight - el.scrollTop <= el.clientHeight + 50) {
        el.scrollTop = el.scrollHeight;
      }
    }
  }, [messages]);

  const receiveMessage = (msg: string) => {
    dispatchMessages({
      type: 'ADD_OTHER',
      messageType: 'text',
      message: msg,
    });
  };

  const sendMessage = () => {
    if (message.trim()) {
      dispatchMessages({
        type: 'ADD_MINE',
        messageType: 'text',
        message: message.trim(),
      });
      socket.emit('send', {
        type: 'text',
        message: message.trim(),
      });
      setMessage('');
    }
  };

  return (
    <Container>
      <ListContainer>
        <ListText>목록</ListText>
        {list.map((e, idx) => (
          <UserWrapper key={e._id} enable={idx === 2}>
            <UserImage
              src={`https://api.dimigo.hs.kr/user_photo/${e.user.profileimage}`}
              onError={(event) => { const el = event.currentTarget; el.src = userIcon; }}
            />
            <UserName>
              <span>{e.title}</span>
              <span>{`(${getUserDisplayText(e.user)})`}</span>
              <div>{e.lastMessage}</div>
            </UserName>
          </UserWrapper>
        ))}
      </ListContainer>
      <MessageContainer>
        <Messages ref={messageContainerEl}>
          {messages.map((e, idx) => (
            <React.Fragment key={idx.toString()}>
              {e.mine ? (
                <MyChat>{e.message}</MyChat>
              ) : (
                <OtherChat>{e.message}</OtherChat>
              )}
            </React.Fragment>
          ))}
        </Messages>
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
