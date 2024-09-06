import themeDefault from "../../../theme/default";
import { ButtonProps } from "./interface";
import styled, { ThemeProvider } from "styled-components";

interface Theme {
  colors: {
    success: string;
  };
}

const Style = styled.button<{ theme: Theme }>`
  background: ${({ theme }) => theme.colors.success};
`;

const Button = ({ theme, children, label }: ButtonProps) => {
  const content = children || label;
  return (
    <ThemeProvider theme={theme || themeDefault}>
      <Style>{content}</Style>
    </ThemeProvider>
  );
};

export default Button;
