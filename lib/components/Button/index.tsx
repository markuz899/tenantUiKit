import { ButtonProps } from "./interface";
import styled from "styled-components";

interface Theme {
  colors: {
    success: string;
  };
}

const Style = styled.button<{ theme: Theme }>`
  background: ${({ theme }) => theme.colors.success};
`;

const Button = ({ children, label }: ButtonProps) => {
  const content = children || label;
  return <Style>{content}</Style>;
};

export default Button;
