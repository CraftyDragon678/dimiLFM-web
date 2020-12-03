import styled from '@emotion/styled';
import React, {
  useCallback,
  useEffect, useLayoutEffect, useReducer, useRef, useState,
} from 'react';
import api from 'src/api';
import { SubTitle } from 'src/components/Text';
import UserImage from 'src/components/UserImage';
import history from 'src/router/history';
import socket from 'src/socket';
import variables from 'src/styles/variables';
import { User } from 'src/types/user';
import { getUserDisplayText } from 'src/utils/user';
import sendSvg from '../assets/images/send.svg';
import addSvg from '../assets/images/add.svg';

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

const MessageHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageHeaderTitle = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${variables.purple};
  font-size: 24px;
  font-weight: bold;
  color: white;

  > span > span {
    font-size: 12px;
  }
`;

const MessageHeaderRef = styled.div`
  display: flex;
  align-items: center;
  padding: 0 40px;
  height: 150px;
  border: 2px solid ${variables.purple};
  line-break: anywhere;
  cursor: pointer;
`;

const MessageHeaderRefImage = styled.img`
  height: 128px;
  width: 128px;
  border-radius: 16px;
`;

const MessageHeaderRefTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const MessageHeaderRefContent = styled.div`
  font-size: 18px;
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

const SendButton = styled.button<{empty: boolean}>`
  border: none;
  margin-left: 10px;
  width: 80px;
  border-radius: 100px;
  background: center / 50% no-repeat url(${({ empty }) => (empty ? addSvg : sendSvg)});
  background-color: ${variables.logoColor};
`;

const Messages = styled.div`
  flex: 1 0px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Chat = styled.div<{firstOfGroup?: boolean, lastOfGroup?: boolean}>`
  padding: 10px 15px;
  margin-bottom: 2px;
  max-width: 80%;
  line-break: anywhere;

  > img {
    max-width: 100%;
  }
`;

const MyChat = styled(Chat)`
  align-self: flex-end;
  background-color: ${variables.logoColor};
  color: white;
  border-radius: 20px 4px 4px 20px;

  border-top-right-radius: ${({ firstOfGroup }) => firstOfGroup && '20px'};
  border-bottom-right-radius: ${({ lastOfGroup }) => lastOfGroup && '20px'};
`;

const OtherChat = styled(Chat)`
  align-self: flex-start;
  margin-bottom: 2px;
  background-color: ${variables.lightGray};
  border-radius: 4px 20px 20px 4px;

  border-top-left-radius: ${({ firstOfGroup }) => firstOfGroup && '20px'};
  border-bottom-left-radius: ${({ lastOfGroup }) => lastOfGroup && '20px'};
`;

const AdditionalContainer = styled.div<{show: boolean}>`
  display: grid;
  place-items: center;
  grid-auto-flow: column;
  transition: 300ms max-height ease;
  height: 80px;
  max-height: ${({ show }) => (show ? '80px' : 0)};
  background-color: ${variables.lightGray};
  overflow: hidden;
`;

const AdditionalItemImage = styled.img`
  width: 32px;
  height: 32px;
  background-color: ${variables.logoColor};
  border-radius: 30px;
  margin-bottom: 4px;
`;

const AdditionalItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface ChatData {
  type: string;
  message: string;
  mine: boolean;
  sendAt: Date;
}

type Action = { type: 'ADD_MINE', messageType: string, message: string }
  | { type: 'ADD_OTHER', messageType: string, message: string, date: Date }
  | { type: 'CLEAR' }
  | { type: 'SET', data: ChatData[] }
  | { type: 'ADD', data: ChatData[] };

interface ChatRoom {
  user: User;
  lastMessage: string;
  _id: string;
  title: string;
}

interface Ref {
  _id: string;
  title: string;
  board: string;
  image?: string;
  content: string;
  foundLocation?: string;
  wantLocation?: string;
  radioIndex?: number;
  afterPrice?: number;
  from?: Date;
  to?: Date;
}

export default () => {
  const firstUpdate = useRef(true);
  const messageContainerEl = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');
  const [messages, dispatchMessages] = useReducer((state: ChatData[], action: Action) => {
    if (messageContainerEl.current) {
      const el = messageContainerEl.current;
      if (el.scrollHeight - el.scrollTop <= el.clientHeight + 50) {
        firstUpdate.current = true;
      }
    }
    switch (action.type) {
      case 'ADD_MINE':
        return [...state, {
          type: action.messageType,
          message: action.message,
          mine: true,
          sendAt: new Date(),
        }].sort((a, b) => a.sendAt.getTime() - b.sendAt.getTime());
      case 'ADD_OTHER':
        return [...state, {
          type: action.messageType,
          message: action.message,
          mine: false,
          sendAt: action.date,
        }].sort((a, b) => a.sendAt.getTime() - b.sendAt.getTime());
      case 'CLEAR':
        return [];
      case 'SET':
        return action.data;
      case 'ADD':
        return [
          ...state,
          ...action.data,
        ].sort((a, b) => a.sendAt.getTime() - b.sendAt.getTime());
      default:
        return state;
    }
  }, []);
  const [list, setList] = useState<ChatRoom[]>([]);
  const channel = history.location.pathname.split('/')[2];
  const [ref, setRef] = useState<Ref>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let canceled = false;
    (async () => {
      const { status, data } = await api.get('/chat/list');
      if (status !== 200 || canceled) return;
      setList(data);
    })();

    return () => {
      canceled = true;
    };
  }, []);

  useEffect(() => {
    let canceled = false;
    (async () => {
      dispatchMessages({ type: 'CLEAR' });
      if (!channel) return;
      const { status, data } = await api.get(`/chat/fetch?id=${channel}`);
      firstUpdate.current = true;
      if (status !== 200 || canceled) return;
      dispatchMessages({
        type: 'SET',
        data: data.messages.map((e: ChatData) => ({
          ...e, sendAt: new Date(e.sendAt),
        })),
      });
      setRef(data.ref);
    })();
    return () => {
      canceled = false;
    };
  }, [channel]);

  useLayoutEffect(() => {
    if (messageContainerEl.current && firstUpdate.current) {
      messageContainerEl.current.scrollTop = messageContainerEl.current.scrollHeight;
      firstUpdate.current = false;
    }
  }, [messages]);

  const receiveMessage = useCallback((msg: {
    channel: string, type: string, message: string, date: string, mine?: boolean,
  }) => {
    setList((prev) => [
      {
        ...prev.find((e) => e._id === msg.channel)!,
        lastMessage: msg.type === 'text' ? msg.message : '(파일)',
      },
      ...prev.filter((e) => e._id !== msg.channel),
    ]);
    if (msg.channel !== channel) return;
    dispatchMessages({
      type: msg.mine ? 'ADD_MINE' : 'ADD_OTHER',
      messageType: msg.type,
      message: msg.message,
      date: new Date(msg.date),
    });
  }, [channel]);

  useEffect(() => {
    socket.on('message', receiveMessage);
    return () => {
      socket.off('message', receiveMessage);
    };
  }, [receiveMessage]);

  const uploadImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    input.addEventListener('change', (ev) => {
      if (input.files) {
        const formData = new FormData();
        formData.append('image', input.files[0]);
        formData.append('id', channel);
        api.post('/chat/upload', formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        });
      }
    });
  };

  const sendMessage = () => {
    if (message) {
      const trimed = message.trim();
      if (trimed) {
        setList((prev) => [
          {
            ...prev.find((e) => e._id === channel)!,
            lastMessage: trimed,
          },
          ...prev.filter((e) => e._id !== channel),
        ]);
        dispatchMessages({
          type: 'ADD_MINE',
          messageType: 'text',
          message: trimed,
        });
        socket.emit('send', {
          type: 'text',
          message: trimed,
          channel,
        });
        setMessage('');
      }
    } else if (ref) {
      setOpen(!open);
    }
  };

  return (
    <Container>
      <ListContainer>
        <ListText>목록</ListText>
        {list.map((e) => (
          <UserWrapper
            key={e._id}
            enable={history.location.pathname.includes(e._id)}
            onClick={() => history.push(`/chat/${e._id}`)}
          >
            <UserImage image={e.user.profileimage} />
            <UserName>
              <span>{e.title}</span>
              <span>{`(${getUserDisplayText(e.user)})`}</span>
              <div>{e.lastMessage}</div>
            </UserName>
          </UserWrapper>
        ))}
      </ListContainer>
      <MessageContainer>
        {ref ? (
          <MessageHeaderContainer>
            <MessageHeaderTitle>
              <UserImage image={list.find((v) => v._id === channel)?.user.profileimage} />
              <span>
                {ref.title}
                <span>{`(${list.find((v) => v._id === channel)?.user.name})`}</span>
              </span>
            </MessageHeaderTitle>
            <MessageHeaderRef
              onClick={() => history.push(`/board/${ref.board}/${ref._id}`)}
            >
              {ref.image && <MessageHeaderRefImage src={ref.image} />}
              <div>
                <MessageHeaderRefTitle>{ref.title}</MessageHeaderRefTitle>
                <MessageHeaderRefContent>{ref.content}</MessageHeaderRefContent>
              </div>
            </MessageHeaderRef>
          </MessageHeaderContainer>
        ) : (
          <MessageHeaderContainer>
            <MessageHeaderTitle>
              대화를 나눌 상대를 선택해주세요
            </MessageHeaderTitle>
            <MessageHeaderRef />
          </MessageHeaderContainer>
        )}
        <Messages ref={messageContainerEl}>
          {messages.map((e, idx) => (
            <React.Fragment key={idx.toString()}>
              {e.mine ? (
                <MyChat
                  firstOfGroup={messages[idx - 1] ? !messages[idx - 1].mine : true}
                  lastOfGroup={messages[idx + 1] ? !messages[idx + 1].mine : true}
                >
                  {e.type === 'text' ? e.message : (
                    <img alt="img" src={e.message} />
                  )}
                </MyChat>
              ) : (
                <OtherChat
                  firstOfGroup={messages[idx - 1] ? messages[idx - 1].mine : true}
                  lastOfGroup={messages[idx + 1] ? messages[idx + 1].mine : true}
                >
                  {e.type === 'text' ? e.message : (
                    <img alt="img" src={e.message} />
                  )}
                </OtherChat>
              )}
            </React.Fragment>
          ))}
        </Messages>
        <InputContainer>
          <Input
            placeholder="메시지를 입력하세요..."
            onKeyDown={(e) => e.key === 'Enter' && channel && sendMessage()}
            value={message}
            onChange={(e) => {
              if (ref) {
                setMessage(e.target.value);
                setOpen(false);
              }
            }}
          />
          <SendButton
            onClick={() => channel && sendMessage()}
            empty={!message}
          />
        </InputContainer>
        <AdditionalContainer show={open}>
          <AdditionalItem onClick={uploadImage}>
            <AdditionalItemImage />
            파일
          </AdditionalItem>
          <AdditionalItem>
            <AdditionalItemImage />
            지도
          </AdditionalItem>
          <AdditionalItem>
            <AdditionalItemImage />
            날짜
          </AdditionalItem>
          <AdditionalItem>
            <AdditionalItemImage />
            신고
          </AdditionalItem>
        </AdditionalContainer>
      </MessageContainer>
    </Container>
  );
};
