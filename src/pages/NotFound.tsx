import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #eb3e2f;
`;

const BigText = styled.div`
  margin: 40px;
  font-size: 200px;
  color: white;
`;

const SmallText = styled.div`
  font-size: 40px;
  color: white;
`;

export default () => (
  <Container>
    <BigText>404</BigText>
    <SmallText>이런! 보성이가 아직 개발 안 했어요</SmallText>
  </Container>
);
