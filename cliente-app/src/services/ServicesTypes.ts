import type { ReactNode } from "react";
import type { ErrorData } from "../components/Errors/TypesErrors";

export interface User {
  id: number,
  nombre: string,
  email: string,
  password: string,
  rol: string
}

export interface UseErrorTypes {
  showError: (data: ErrorData) => void;
  hideError: () => void;
}

export interface UserContextType {
  user: User | null;
  setUser: (x: User | null) => void,
}

export interface Carrito {
  id_carrito: number,
  id_user: number,
  fecha_creacion: Date
}

export interface Libros {
  id: number,
  id_categoria: string,
  url: string,
  titulo: string,
  autor: string,
  fecha: Date,
  sinopsis: string,
  precio: number,
  stock: number,
  cantidad: number,
}

export interface DetalleCarrito {
  id_detalle: number,
  id_carrito: number,
  id_book: number | null,
  cantidad: number,
}

export interface LibrosCarritoPost {
  id_carrito: number | null,
  id_book: number,
  cantidad: number
}

export interface CartContextType {
  carrito: Carrito | null | undefined;
  librosCarrito: DetalleCarrito[] | undefined;
  agregarAlCarrito: (libro: Libros) => Promise<void>;
  eliminarDelCarrito: (id_book: number) => Promise<void>;
  cambiarCantidad: (libroActual: Libros) => Promise<void>;
  vaciarCarrito: () => void;
  cantidadTotal: number | undefined;
}

export interface ProtectedRuleProps {
  children: ReactNode,
  onlyAdmin: boolean,
}