// import { ReactNode, createContext, useContext, useState } from "react";

// interface ThemeContextType {
//   theme: any;
//   toggleTheme: () => void;
// }

// interface IProps {
//   theme?: any;
//   children: ReactNode;
// }

// export const ThemeContext = createContext<ThemeContextType | null>(null);

// const ThemeContextProvider = ({ theme, children }: IProps) => {
//   const [currentTheme, setTheme] = useState(theme);

//   return (
//     <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
//   );
// };

// export default ThemeContextProvider;

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (context === null) {
//     throw new Error("Context must be used within a context provider");
//   }
//   return context;
// };

interface ThemeProviderProps {
  theme?: any;
  children: any;
}

import styled, {
  createGlobalStyle,
  css,
  ThemeProvider as StyledProvider,
} from "styled-components";

const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
  return <StyledProvider theme={theme}>{children}</StyledProvider>;
};

const globalStyle = createGlobalStyle;

export { ThemeProvider, globalStyle, styled, css };
