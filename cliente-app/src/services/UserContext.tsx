import { createContext } from "react";
import type { UserContextType } from "./ServicesTypes";

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser() {
    return null;
  },
});