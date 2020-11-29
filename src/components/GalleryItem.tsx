import React from 'react';
import styled from '@emotion/styled';

interface IGalleryItem {
  /** image address */
  image: string;
  title: string;
  subtitle: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Container = styled.div`
  cursor: pointer;
  height: 200px;
  :hover {
    box-shadow: 0 0 6px rgba(0, 0, 0, .16);
  }
`;

const Image = styled.img`
  height: 150px;
  width: 150px;
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const SubTitle = styled.div`
  font-size: 16px;
`;

const GalleryItem: React.FC<IGalleryItem> = ({
  image, title, subtitle, onClick,
}) => (
  <Container onClick={onClick}>
    <Image src={image} />
    <Title>{title}</Title>
    <SubTitle>{subtitle}</SubTitle>
  </Container>
);

export default GalleryItem;
