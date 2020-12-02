import styled from '@emotion/styled';
import { Viewer } from '@toast-ui/react-editor';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import api from 'src/api';
import Arrow from 'src/components/Arrow';
import { TextButton } from 'src/components/Button';
import UserImage from 'src/components/UserImage';
import history from 'src/router/history';
import variables from 'src/styles/variables';
import { Board } from 'src/types/board';
import { User } from 'src/types/user';
import { getUserDisplayText } from 'src/utils/user';
import sendSvg from '../../assets/images/send.svg';

interface Data {
  _id: string;
  title: string;
  description: string[];
  content: string;
  tag: string;
  user: User;
  mine: boolean;
  done: boolean;
  createdAt: Date;
}

const Container = styled.div`
  background-color: white;
`;

const HeaderContainer = styled.div`
  background-color: ${variables.purple};
  display: flex;
  justify-content: flex-end;
  color: white;
  padding: 30px 40px;

  > div {
    flex: 1;
  }
`;

const HeaderTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const HeaderTitleUser = styled.span`
  margin-left: 10px;
  font-size: 18px;
  font-weight: normal;
`;

const HeaderDescription = styled.div`
  font-size: 14px;
  font-weight: bold;
  > p {
    margin-bottom: 4px;
  }
`;

const HeaderDoneIndicator = styled.div`
  width: 60px;
  height: 60px;
  background-color: #00FF33;
  border-radius: 30px;
  margin-left: auto;
  font-size: 24px;
  display: grid;
  place-items: center;
  position: absolute;
  transform: translateY(-10px);
`;

const BodyContainer = styled.div`
  padding: 20px;
`;

const BodyButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BodySendImage = styled.img`
  height: 20px;
`;

export default ({
  id, describe, board,
}: {
  id: string,
  describe: ((data: any) => string[] | React.ReactElement),
  board: Board,
}) => {
  const [article, setArticle] = useState<Data>();
  useEffect(() => {
    let canceled = false;
    (async () => {
      const { status, data } = await api.get(`/board/${board}/${id}`);
      if (status !== 200 || canceled) return;
      setArticle({ ...data, description: describe(data) });
    })();

    return () => {
      setArticle(undefined);
      canceled = true;
    };
  }, [board, describe, id]);

  const contact = async () => {
    if (article) {
      const { status, data } = await api.post('/chat/open', {
        id: article._id,
        board,
      });
      if (status !== 201 && status !== 409) return;
      history.push(`/chat/${data._id}`);
    }
  };

  const makeDone = async () => {
    if (article && article.mine) {
      const { status, data } = await api.put(`/board/${board}/${id}/done`);
      if (status !== 200) return;
      setArticle({
        ...article,
        done: data.done,
      });
    }
  };

  return (
    article ? (
      <Container>
        <HeaderContainer>
          <UserImage image={article.user.profileimage} />
          <div>
            <HeaderTitle>
              {article.title}
              <HeaderTitleUser>{`(${getUserDisplayText(article.user)})`}</HeaderTitleUser>
            </HeaderTitle>
            <HeaderDescription>
              <p>{dayjs(article.createdAt).format('YYYY/MM/DD HH:mm')}</p>
              {Array.isArray(article.description) ? article.description.map((e, idx) => (
                <p key={idx.toString()}>{e}</p>
              )) : article.description}
            </HeaderDescription>
          </div>
          {article.done && <HeaderDoneIndicator>완료</HeaderDoneIndicator>}
        </HeaderContainer>
        <BodyContainer>
          <BodyButtons>
            <TextButton onClick={() => history.push(history.location.pathname.split('/').slice(0, 3).join('/'))}>
              <Arrow left />
              {' '}
              메인 화면으로 돌아가기
            </TextButton>
            {article.mine ? (
              <TextButton onClick={makeDone}>
                {article.done ? '미완료로 표시' : '완료로 표시'}
              </TextButton>
            ) : (
              <TextButton onClick={contact}>
                메시지 보내기
                {' '}
                <BodySendImage src={sendSvg} />
              </TextButton>
            )}
          </BodyButtons>
          <Viewer initialValue={article.content} />
        </BodyContainer>
      </Container>
    ) : (
      <></>
    )
  );
};
