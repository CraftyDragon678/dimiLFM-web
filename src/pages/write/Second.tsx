import styled from '@emotion/styled';
import { Editor } from '@toast-ui/react-editor';
import React, { useRef } from 'react';
import { TitleInput } from 'src/components/Input';
import Select from 'src/components/Select';
import { SubTitle } from 'src/components/Text';
import { Tag } from 'src/data/tags';
import { WriteProps } from '../../types/write';

export interface SecondProps {
  title: string;
  content: string;
  tag: Tag;
}

const TitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-column-gap: 10px;
`;

const Second: React.FC<WriteProps<SecondProps>> = ({
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
            verify(!!e.target.value && !!data.content);
          }}
          placeholder="제목"
        />
        <Select
          index={tags.indexOf(data.tag as any)}
          options={tags as any}
          onChange={(index) => dataHandler({ ...data, tag: tags[index] })}
        />
      </TitleWrapper>
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
