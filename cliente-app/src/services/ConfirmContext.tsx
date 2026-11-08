import { createContext } from "react";

interface ConfirmContextType {
  showConfirm: (message: string, action: () => void) => void;
}

export const ConfirmContext = createContext<ConfirmContextType | null>(null);