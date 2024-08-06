interface ThemeProviderProps {
  theme?: any;
  children: any;
}

import { ThemeProvider as StyledProvider } from "styled-components";

const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
  return <StyledProvider theme={theme}>{children}</StyledProvider>;
};

export { ThemeProvider };
