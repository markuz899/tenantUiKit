import defaultTheme from "./default";

const theme: any = {
  ...defaultTheme,
};

export const availableSize: string[] = ["xs", "sm", "md", "lg", "xl"];

export const BASE_COLOR = {
  primary: theme.colors.primary,
  info: theme.colors.primary,
  success: theme.colors.success,
  warning: theme.colors.warning,
  error: theme.colors.error,
  ghost: theme.colors.dark,
};

export default theme;
