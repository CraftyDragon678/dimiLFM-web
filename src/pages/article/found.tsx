import styled from '@emotion/styled';
import { Viewer } from '@toast-ui/react-editor';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import api from 'src/api';
import Button from 'src/components/Button';
import history from 'src/router/history';
import socket from 'src/socket';

interface FoundData {
  _id: string;
  done: boolean;
  foundLocation: string;
  from: Date;
  to: Date;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  tag: string;
  radioIndex: number;
  user: {
    serial: number;
    name: string;
  };
}

const Container = styled.div`
  background-color: white;
`;

export default ({ match }: RouteComponentProps<{id: string}>) => {
  const [article, setArticle] = useState<FoundData>();
  useEffect(() => {
    (async () => {
      const { status, data } = await api.get(`/board/found/${match.params.id}`);
      if (status !== 200) return;
      setArticle(data);
    })();

    const moveToChat = () => {
      history.push('/chat');
    };
    socket.on('open', moveToChat);

    return () => {
      setArticle(undefined);
      socket.off('open', moveToChat);
    };
  }, [match]);

  const contact = () => {
    if (article) {
      socket.emit('open', {
        id: article._id,
        board: 'found',
      });
    }
  };

  return (
    article ? (
      <Container>
        <Viewer initialValue={article.content} />
        <Button onClick={contact}>연락하기</Button>
      </Container>
    ) : (
      <></>
    )
  );
};
