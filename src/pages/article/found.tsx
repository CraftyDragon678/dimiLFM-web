import { Viewer } from '@toast-ui/react-editor';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import api from 'src/api';

export default ({ match }: RouteComponentProps<{id: string}>) => {
  const [content, setContent] = useState('');
  useEffect(() => {
    (async () => {
      const { status, data } = await api.get(`/board/found/${match.params.id}`);
      if (status !== 200) return;
      setContent(data.content);
    })();

    return () => {
      setContent('');
    };
  }, [match]);

  return (
    <>
      {content && <Viewer initialValue={content} />}
    </>
  );
};
