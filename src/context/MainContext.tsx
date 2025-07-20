//? Module
import { type ReactNode } from "react";

//? Context
import { LoadingProvider, ThemeProvider, ModalProvider } from "./";

//? Coponent
import { RouteLoader } from "../component";

declare type PMainContext = { children: ReactNode };

export function MainContext(props: PMainContext) {
  const { children } = props;

  return (
    <RouteLoader>
      <LoadingProvider>
        <ModalProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ModalProvider>
      </LoadingProvider>
    </RouteLoader>
  );
}

export default MainContext;
