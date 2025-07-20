import { type ReactNode } from "react";

export declare type TModal = {
  open: boolean;
  isError: boolean;
  message: ReactNode | string | null;
};
