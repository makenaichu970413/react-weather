//? Module
import type { Dispatch, SetStateAction, ReactNode } from "react";
import { useState, useEffect, useContext, createContext } from "react";
import { CacheGet, CacheSet } from "../utils/cache";

export declare type TTheme = "LIGHT" | "DARK";

declare type TThemeContext = {
  theme: TTheme;
  setTheme: Dispatch<SetStateAction<TTheme>>;
};

declare type PThemeProvider = {
  children: ReactNode;
};

const ThemeContext = createContext<TThemeContext>({
  theme: "LIGHT",
  setTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used under ThemeProvider");
  }
  return context;
};

export function ThemeProvider(props: PThemeProvider) {
  const [theme, setTheme] = useState<TTheme>(
    CacheGet<TTheme>({ key: "THEME" }) ?? "LIGHT"
  );

  useEffect(() => {
    CacheSet<TTheme>({ key: "THEME", value: theme });
  }, [theme]);

  const value: TThemeContext = { theme, setTheme };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
