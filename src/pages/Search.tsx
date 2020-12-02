import styled from '@emotion/styled';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import history from 'src/router/history';
import variables from 'src/styles/variables';
import { Board } from 'src/types/board';

const Container = styled.div`
  background-color: white;
  padding: 20px 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 80px;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ItemImageWrapper = styled.div<{done: boolean}>`
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

interface ItemProps {
  image?: string;
  title: string;
  subtitle: string;
  description: string;
  board: Board;
  id: string;
}

export default ({ match }: RouteComponentProps<{query: string}>) => {
  const { query } = match.params;

  const Item: React.FC<ItemProps> = ({
    image, title, subtitle, description, board, id,
  }) => (
    <ItemWrapper
      onClick={() => history.push(`/board/${board}/${id}`)}
    >
      <ItemImageWrapper done={false}>
        <ItemImage src={image} done={false} />
      </ItemImageWrapper>
      <div>
        <ItemTitle>{title}</ItemTitle>
        <ItemSubTitle>{subtitle}</ItemSubTitle>
        <ItemDescription>{description}</ItemDescription>
      </div>
    </ItemWrapper>
  );

  return (
    <Container>
      <Item
        title="파세코 캠핑난로"
        subtitle="[찾아주세요] 1628 리보솜"
        description="tteststestetstetetsetteststestetstetetsetteststestetstetetsetteststestetstetetseteststestetstetetset"
        board="lost"
        id="1243"
      />
      <Item
        title="파세코 캠핑난로"
        subtitle="[찾아주세요] 1628 리보솜"
        description="tteststestetstetetsetteststestetstetetsetteststestetstetetsetteststestetstetetseteststestetstetetset"
        board="lost"
        id="1243"
      />
    </Container>
  );
};
