import { createContext, useContext } from "react";
import type { CartContextType } from "./ServicesTypes";

export const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  return useContext(CartContext);
};