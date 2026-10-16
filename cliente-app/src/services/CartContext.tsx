
import { createContext, useContext } from "react";
import type { CartContextType } from "./ServicesTypes";

export const CartContext = createContext<CartContextType | null>(null);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (context === null)
    throw new Error(
      "useCart debe utilizarse dentro de un CartProvider"
    );

  return context;
};
