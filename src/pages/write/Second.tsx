import { Editor } from '@toast-ui/react-editor';
import React, { useRef } from 'react';
import { TitleInput } from 'src/components/Input';
import { WriteProps } from '../../types/write';

export interface SecondProps {
  title: string;
  content: string;
}

const Second: React.FC<WriteProps<SecondProps>> = ({ verify, data, dataHandler }) => {
  const editorEl = useRef<Editor>(null);

  return (
    <>
      <TitleInput
        value={data.title}
        onChange={(e) => {
          dataHandler({ ...data, title: e.target.value });
          verify(!!e.target.value && !!data.content);
        }}
        placeholder="제목"
      />
      <Editor
        placeholder="내용을 입력하세요"
        events={{
          change: () => dataHandler((prev) => {
            const content = editorEl.current?.getInstance().getHtml() || '';
            verify(!!prev.title && !!content);

            return {
              ...prev,
              content,
            };
          }),
        }}
        ref={editorEl}
        initialEditType="wysiwyg"
      />
    </>
  );
};

export default Second;
