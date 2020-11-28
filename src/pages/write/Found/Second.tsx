import styled from '@emotion/styled';
import { Editor } from '@toast-ui/react-editor';
import React, { useRef } from 'react';
import Input from 'src/components/Input';
import { WriteProps } from '../../../types/write';

export interface SecondProps {
  title: string;
  content: string;
}

const Title = styled(Input)`
  height: 30px;
  margin-bottom: 20px;
  width: 100%;
`;

const Second: React.FC<WriteProps<SecondProps>> = ({ verify, data, dataHandler }) => {
  const editorEl = useRef<Editor>(null);

  return (
    <>
      <Title
        value={data.title}
        onChange={(e) => {
          dataHandler({ ...data, title: e.target.value });
          verify(!!e.target.value);
        }}
        placeholder="제목"
      />
      <Editor
        events={{
          change: () => dataHandler((prev) => {
            return {
              ...prev,
              content: editorEl.current?.getInstance().getHtml() || '',
            };
          }),
        }}
        ref={editorEl}
      />
    </>
  );
};

export default Second;
