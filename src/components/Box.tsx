import styled from "@emotion/styled";

export default styled.div<{shadow?: boolean}>`
  background-color: white;
  border-radius: 20px;
  padding: 16px;
  box-shadow: ${({ shadow }) => shadow && '0 3px 6px rgba(0, 0, 0, .16)'};
`;