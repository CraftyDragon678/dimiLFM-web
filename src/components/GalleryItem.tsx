import React from 'react';
import styled from '@emotion/styled';
import variables from 'src/styles/variables';

interface IGalleryItem {
  /** image address */
  image: string;
  title: string;
  subtitle: string;
  done: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Container = styled.div`
  cursor: pointer;
  height: 200px;
  padding: 10px;
  transition: 300ms box-shadow ease;
  :hover {
    box-shadow: 0 0 6px rgba(0, 0, 0, .16);
  }
`;

const ImageWrapper = styled.div<{done: boolean}>`
  margin-bottom: 10px;
  position: relative;
  display: grid;
  place-items: center;
  ::after {
    content: ${({ done }) => done && '완료'};
    color: white;
    font-size: 30px;
    display: inline-block;
    position: absolute;
  }
`;

const Image = styled.img<{done: boolean}>`
  height: 150px;
  width: 150px;
  border-radius: 16px;
  background-color: ${variables.gray};
  filter: ${({ done }) => done && 'brightness(50%)'};
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const SubTitle = styled.div`
  font-size: 16px;
`;

const GalleryItem: React.FC<IGalleryItem> = ({
  image, title, subtitle, done, onClick,
}) => (
  <Container onClick={onClick}>
    <ImageWrapper done={done}>
      <Image src={image} done={done} />
    </ImageWrapper>
    <Title>{title}</Title>
    <SubTitle>{subtitle}</SubTitle>
  </Container>
);

export default GalleryItem;
