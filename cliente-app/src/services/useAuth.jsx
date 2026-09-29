import { createContext, useContext } from "react";
import { UserContext } from "./UserContext";

export const ErrorContext = createContext();


export const useAuth = () => {
  return useContext(UserContext);
};

export function useError() {
  return useContext(ErrorContext);
}