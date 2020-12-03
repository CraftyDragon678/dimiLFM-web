import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import api from 'src/api';
import history from 'src/router/history';
import variables from 'src/styles/variables';
import { User } from 'src/types/user';
import { getUserDisplayText } from 'src/utils/user';
import UserImage from './UserImage';

const Container = styled.div`
  position: absolute;
  right: 20px;
  width: 190px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${variables.purple};
  border-radius: 30px;
  box-sizing: border-box;
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;

  > img {
    width: 40px;
    height: 40px;
    border: none;
  }
`;

const PopItem = styled.div`
  padding: 14px;
  font-size: 20px;
  font-weight: normal;
  text-align: center;
  color: black;
  width: 100%;
  box-sizing: border-box;

  :hover {
    background-color: ${variables.lightGray};
  }
`;

const Pop = styled.div`
  box-shadow: 0 0 6px rgba(0, 0, 0, .16);
  position: absolute;
  background-color: white;
  border: 1px solid ${variables.borderColor};
  border-radius: 8px;
  top: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ::before {
    font-size: 5px;
    content: '▲';
    color: ${variables.borderColor};
    position: absolute;
    top: -5px;
  }

  ${PopItem}:first-of-type {
    border-radius: 8px 8px 0 0;
  }

  ${PopItem}:last-of-type {
    border-radius: 0 0 8px 8px;
  }
`;

export default () => {
  const [open, setOpen] = useState(false);
  const [me, setMe] = useState<User>();

  useEffect(() => {
    let canceled = false;
    (async () => {
      const { status, data } = await api.get('/auth/me');
      if (status !== 200 || canceled) return;
      setMe(data);
    })();
    return () => {
      canceled = true;
    };
  }, []);

  const logout = async () => {
    await api.post('/auth/revoke');
    history.push('/login');
  };

  return (
    me ? (
      <Container onClick={() => setOpen(!open)}>
        <UserImage image={me.profileimage} />
        {getUserDisplayText(me)}
        {open && (
          <Pop>
            <PopItem>프로필 설정</PopItem>
            <PopItem onClick={logout}>로그아웃</PopItem>
          </Pop>
        )}
      </Container>
    ) : null
  );
};
