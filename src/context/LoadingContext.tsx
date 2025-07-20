//? Module
import React from "react";

//? Component
import { LoadingSpinner } from "../component";

declare type TLoadingContext = {
  loading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
};

declare type PLoadingProvider = {
  children: React.ReactNode;
};

const LoadingContext = React.createContext<TLoadingContext>({
  loading: false,
  showLoading: () => {},
  hideLoading: () => {},
});

export const useLoading = () => {
  const context = React.useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoadingContext must be used under LoadingProvider");
  }
  return context;
};

export const LoadingProvider = (props: PLoadingProvider) => {
  const [loading, setLoading] = React.useState(false);
  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  const value: TLoadingContext = { loading, showLoading, hideLoading };

  return (
    <LoadingContext.Provider value={value}>
      {loading && <LoadingSpinner />}

      {props.children}
    </LoadingContext.Provider>
  );
};
