import css from '@emotion/css';
import styled from '@emotion/styled';
import variables from '../styles/variables';

type TInputSize = 'short' | 'medium' | 'long' | number;

interface IInput {
  width?: TInputSize;
  error?: boolean;
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
  font-size: 16px;
  box-sizing: border-box;
  ::placeholder {
    color: ${variables.gray};
  }
`;

export default styled.input<IInput>`
  ${inputStyle}

  width: ${({ width }) => getWidth(width)};
  border-color: ${({ error }) => error && variables.error};
`;
