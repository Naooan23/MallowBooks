import { createContext, useContext } from "react";
import { ConfirmContext } from "./ConfirmContext";
import type { UseErrorTypes } from "./ServicesTypes";
import { UserContext } from "./UserContext";

export const ErrorContext = createContext<UseErrorTypes>({
  showError: () => { },
  hideError: () => { }
});

export const useAuth = () => {
  return useContext(UserContext);
};

export function useError() {
  return useContext(ErrorContext);
}

export const useConfirm = () => {
  const context = useContext(ConfirmContext);

  if (!context) {
    throw new Error("useConfirm debe utilizarse dentro de ConfirmProvider");
  }

  return context;
};