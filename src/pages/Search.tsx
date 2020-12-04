import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import api from 'src/api';
import history from 'src/router/history';
import variables from 'src/styles/variables';
import { Board, boardShortTexts } from 'src/types/board';
import { User } from 'src/types/user';
import { getUserDisplayText } from 'src/utils/user';

const Container = styled.div`
  background-color: white;
  padding: 20px 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 80px;
  row-gap: 80px;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ItemImageWrapper = styled.div<{done: boolean}>`
  position: relative;
  display: grid;
  place-items: center;
  margin-right: 10px;
  ::after {
    content: ${({ done }) => done && '"완료"'};
    color: white;
    font-size: 30px;
    display: inline-block;
    position: absolute;
  }
`;

const ItemImage = styled.img<{done: boolean}>`
  height: 150px;
  width: 150px;
  border-radius: 16px;
  background-color: ${variables.gray};
  filter: ${({ done }) => done && 'brightness(50%)'};
`;

const ItemTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ItemSubTitle = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
`;

const ItemDescription = styled.div`
  font-size: 14px;
  line-break: anywhere;
`;

const Highlight = styled.span`
  color: ${variables.purple};
`;

interface Article {
  board: Board;
  _id: string;
  tag: string;
  done: boolean;
  title: string;
  content: string;
  image?: string;
  user: User;
}

interface ItemProps {
  image?: string;
  done: boolean;
  title: string;
  subtitle: string;
  description: string;
  board: Board;
  id: string;
}

export default ({ match }: RouteComponentProps<{query: string}>) => {
  const { query } = match.params;
  const [list, setList] = useState<Article[]>([]);

  useEffect(() => {
    let canceled = false;
    (async () => {
      const { status, data } = await api.get(`/board/search?query=${query}`);
      if (status !== 200 || canceled) return;
      setList(data);
    })();
    return () => {
      canceled = true;
      setList([]);
    };
  }, [query]);

  const H: React.FC<{arr: string[]}> = ({ arr }) => (
    <>
      {arr.reduce((prev, curr, idx) => (
        <>
          {idx === 0 ? curr : (
            <>
              {prev}
              <Highlight>{query}</Highlight>
              {curr}
            </>
          )}
        </>
      ), <></>)}
    </>
  );

  const Item: React.FC<ItemProps> = ({
    image, title, subtitle, description, board, id, done,
  }) => (
    <ItemWrapper
      onClick={() => history.push(`/board/${board}/${id}`)}
    >
      <ItemImageWrapper done={done}>
        <ItemImage src={image} done={done} />
      </ItemImageWrapper>
      <div>
        <ItemTitle><H arr={title.split(query)} /></ItemTitle>
        <ItemSubTitle><H arr={subtitle.split(query)} /></ItemSubTitle>
        <ItemDescription><H arr={description.split(query)} /></ItemDescription>
      </div>
    </ItemWrapper>
  );

  return (
    <Container>
      {list.length ? list.map((e) => (
        <Item
          done={e.done}
          title={e.title}
          image={e.image}
          subtitle={`[${boardShortTexts[e.board]}] ${getUserDisplayText(e.user)}`}
          description={e.content}
          board={e.board}
          id={e._id}
          key={e._id}
        />
      )): (
        '결과가 없습니다.'
      )}
    </Container>
  );
};
