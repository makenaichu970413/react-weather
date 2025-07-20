import { type ReactNode } from "react";
import ToggleTheme from "./ToggleTheme";
import { useTheme } from "../context";

declare type PMainLayout = { children: ReactNode };

export function MainLayout(props: PMainLayout) {
  const { children } = props;
  const { theme } = useTheme();

  return (
    <div className={`app ${theme === "LIGHT" ? "light" : "dark"}`}>
      <ToggleTheme />

      {children}
    </div>
  );
}

export default MainLayout;
