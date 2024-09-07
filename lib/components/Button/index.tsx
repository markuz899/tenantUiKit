import { useTheme } from "../../hooks/useTheme";
import { ButtonProps } from "./interface";
// import styled from "styled-components";

// interface Theme {
//   colors: {
//     success: string;
//   };
// }

// const Style = styled.button<{ theme: Theme }>`
//   background: ${({ theme }) => theme.colors.success};
// `;

const Button = ({ children, label }: ButtonProps) => {
  const { themeCurrent } = useTheme();
  console.log("from comp", themeCurrent);
  const content = children || label;
  return <button>{content}</button>;
};

export default Button;
