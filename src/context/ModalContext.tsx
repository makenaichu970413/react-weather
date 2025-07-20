//? Module
import React, { useState, type Dispatch, type SetStateAction } from "react";

//? Component
import { Modal } from "../component";

//? Utils
import type { TModal } from "../utils/models";

declare type TModalContext = {
  modal: TModal;
  setModal: Dispatch<SetStateAction<TModal>>;
};

declare type PModalProvider = {
  children: React.ReactNode;
};

const InitModal: TModal = {
  open: false,
  isError: true,
  message: null,
};

const ModalContext = React.createContext<TModalContext>({
  modal: InitModal,
  setModal: () => {},
});

export const useModal = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used under LoadingProvider");
  }
  return context;
};

export const ModalProvider = (props: PModalProvider) => {
  const [modal, setModal] = useState<TModal>(InitModal);

  const value: TModalContext = { modal, setModal };

  return (
    <ModalContext.Provider value={value}>
      <Modal />

      {props.children}
    </ModalContext.Provider>
  );
};
