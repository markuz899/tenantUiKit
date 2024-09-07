import { useEffect, useState } from "react";

const useTheme = (initialTheme?: any) => {
  const [theme, setTheme] = useState<any>(initialTheme);

  const setThemeMode = (theme: any) => {
    setTheme(theme);
  };

  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);

  return { themeCurrent: theme, setMode: setThemeMode } as const;
};

export { useTheme };
