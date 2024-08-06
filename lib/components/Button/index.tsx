import styled from "styled-components";
import { ButtonProps } from "./interface";

const Button = ({ children, label }: ButtonProps) => {
  const content = children || label;
  return <Style>{content}</Style>;
};

export default Button;

const Style = styled.button`
  border: 1px solid red;
`;
