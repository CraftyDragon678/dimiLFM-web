import styled from '@emotion/styled';
import { Viewer } from '@toast-ui/react-editor';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import api from 'src/api';
import Arrow from 'src/components/Arrow';
import Button, { TextButton } from 'src/components/Button';
import UserImage from 'src/components/UserImage';
import { getName } from 'src/data/map';
import history from 'src/router/history';
import variables from 'src/styles/variables';
import { User } from 'src/types/user';
import { getRangeText } from 'src/utils/date';
import { getUserDisplayText } from 'src/utils/user';
import sendSvg from '../../assets/images/send.svg';

interface FoundData {
  _id: string;
  done: boolean;
  foundLocation: string;
  wantLocation?: string;
  from: Date;
  to: Date;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  tag: string;
  radioIndex: number;
  user: User;
}

const Container = styled.div`
  background-color: white;
`;

const HeaderContainer = styled.div`
  background-color: ${variables.purple};
  display: flex;
  color: white;
  padding: 30px 40px;
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
      if (status !== 201 && status !== 409) return;
      history.push(`/chat/${data._id}`);
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
              <p>
                [발견 일시]
                {' '}
                {getRangeText([new Date(article.from), new Date(article.to)])}
              </p>
              <p>
                [발견 장소]
                {' '}
                {getName(article.foundLocation)}
              </p>
              {
                article.radioIndex === 0
                  ? <p>발견 장소에 물건이 그대로 있습니다</p>
                  : article.radioIndex === 1
                    ? (
                      <p>
                        [희망 장소]
                        {' '}
                        {article.wantLocation && getName(article.wantLocation)}
                        에 맡겼습니다
                      </p>
                    ) : (
                      <p>
                        [희망 장소]
                        {' '}
                        {article.wantLocation && getName(article.wantLocation)}
                        에서 가지고 있습니다
                      </p>
                    )
              }
            </HeaderDescription>
          </div>
        </HeaderContainer>
        <BodyContainer>
          <BodyButtons>
            <TextButton>
              <Arrow left />
              {' '}
              메인 화면으로 돌아가기
            </TextButton>
            <TextButton onClick={contact}>
              메시지 보내기
              {' '}
              <BodySendImage src={sendSvg} />
            </TextButton>
          </BodyButtons>
          <Viewer initialValue={article.content} />
        </BodyContainer>
      </Container>
    ) : (
      <></>
    )
  );
};
