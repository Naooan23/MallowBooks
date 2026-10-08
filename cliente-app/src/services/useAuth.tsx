import { createContext, useContext } from "react";
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
