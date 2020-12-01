import React from 'react';
import styled from '@emotion/styled';
import variables from 'src/styles/variables';
import userIcon from '../assets/images/user.svg';

interface UserImageProps {
  image?: string;
}

const UserImageComponent = styled.img`
  width: 50px;
  height: 50px;
  border: 1px solid ${variables.borderColor};
  border-radius: 25px;
  margin-right: 10px;
  object-fit: contain;
  object-position: center;
`;

const UserImage: React.FC<UserImageProps> = ({ image }) => (
  <UserImageComponent
    src={`https://api.dimigo.hs.kr/user_photo/${image}`}
    onError={(e) => { const el = e.currentTarget; el.src = userIcon; }}
  />
);

export default UserImage;
