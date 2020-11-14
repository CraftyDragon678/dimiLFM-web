import React from 'react';
import styled from '@emotion/styled';

interface IGalleryItem {
  /** image address */
  image: string;
  title: string;
  author: string;
}

const Container = styled.div`
  width: 300px;
  height: 400px;
`;

const Image = styled.img`
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Author = styled.div`
  font-size: 16px;
`;

const GalleryItem: React.FC<IGalleryItem> = ({ image, title, author }) => (
  <Container>
    <Image src={image} />
    <Title>{title}</Title>
    <Author>{author}</Author>
  </Container>
);

export default GalleryItem;