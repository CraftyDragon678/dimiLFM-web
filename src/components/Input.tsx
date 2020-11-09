import css from '@emotion/css';
import styled from '@emotion/styled';
import variables from '../styles/variables';

type TInputSize = 'short' | 'medium' | 'long' | number;

interface IInput {
  width?: TInputSize;
}

const getWidth = (size?: TInputSize) => (
  !size || size === "medium" ? "140px"
    : size === "long" ? "260px"
      : size === "short" ? "70px"
        : `${size}px`
);

const inputStyle = css`
  height: 50px;
  border: 1px solid ${variables.borderColor};
  border-radius: 8px;
  padding: 10px 20px;
  background-color: ${variables.gray};
  box-sizing: border-box;
  ::placeholder {
    color: ${variables.darkgray};
  }
`;

export default styled.input<IInput>`
  ${inputStyle}

  width: ${({ width }) => getWidth(width)};
`;
