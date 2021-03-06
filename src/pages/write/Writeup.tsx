import styled from '@emotion/styled';
import { Editor } from '@toast-ui/react-editor';
import React, { useRef } from 'react';
import { TitleInput } from 'src/components/Input';
import Select from 'src/components/Select';
import { SubTitle } from 'src/components/Text';
import { Tag } from 'src/data/tags';
import { WriteProps } from '../../types/write';

export interface WriteupProps {
  title: string;
  content: string;
  tag?: Tag;
}

const TitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  column-gap: 10px;
`;

const Writeup: React.FC<WriteProps<WriteupProps>> = ({
  verify, data, dataHandler, tags,
}) => {
  const editorEl = useRef<Editor>(null);

  return (
    <>
      <SubTitle>내용 작성</SubTitle>
      <TitleWrapper>
        <TitleInput
          value={data.title}
          onChange={(e) => {
            dataHandler({ ...data, title: e.target.value });
            verify(!!e.target.value && !!data.tag && !!data.content);
          }}
          placeholder="제목"
        />
        <Select
          index={(tags.indexOf(data.tag as never) + 1) || 0}
          options={['태그', ...tags]}
          onChange={(index) => {
            if (index) {
              dataHandler({ ...data, tag: tags[index - 1] });
              verify(!!data.title && !!data.content);
            }
          }}
        />
      </TitleWrapper>
      <Editor
        height="800px"
        initialValue={data.content}
        placeholder="내용을 입력하세요"
        events={{
          change: () => dataHandler((prev) => {
            const content = editorEl.current?.getInstance().getHtml() || '';
            verify(!!prev.title && !!prev.tag && !!content);

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

export default Writeup;
