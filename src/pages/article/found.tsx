import styled from '@emotion/styled';
import { Viewer } from '@toast-ui/react-editor';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import api from 'src/api';
import Button from 'src/components/Button';
import history from 'src/router/history';

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

    return () => {
      setArticle(undefined);
    };
  }, [match]);

  const contact = async () => {
    if (article) {
      const { status, data } = await api.post('/chat/open', {
        id: article._id,
        board: 'found',
      });
      if (status !== 201) return;
      history.push(`/chat/${data._id}`);
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
