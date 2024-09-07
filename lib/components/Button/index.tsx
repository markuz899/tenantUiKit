import { ButtonProps } from "./interface";
import styled from "styled-components";

const Style = styled.button`
  background: ${({ theme }) => {
    console.log("theme-styled", theme);
    return "red";
  }};
`;

const Button = ({ children, label }: ButtonProps) => {
  const content = children || label;
  return <Style>{content}</Style>;
};

export default Button;
