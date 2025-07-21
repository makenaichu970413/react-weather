import { type ReactNode } from "react";
import ToggleTheme from "./ToggleTheme";
import { useTheme } from "../context";
import AOS from "./AOS";

declare type PMainLayout = { children: ReactNode };

export function MainLayout(props: PMainLayout) {
  const { children } = props;
  const { theme } = useTheme();

  return (
    <>
      <AOS />

      <div className={`app ${theme === "LIGHT" ? "light" : "dark"}`}>
        <ToggleTheme />

        {children}
      </div>
    </>
  );
}

export default MainLayout;
