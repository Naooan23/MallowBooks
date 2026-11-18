import type { ReactNode } from "react";
import type { ErrorData } from "../components/Errors/TypesErrors";

export interface User {
  id_user: number,
  nombre: string,
  email: string,
  password?: string,
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
export interface CarritoProps {
  id_carrito: number;
  id_user: number;
  fecha_creacion: string;
}

export interface LibroCarrito extends Libros {
  id_book: number;
  cantidad: number;
}

export interface CarritoCompleto extends CarritoProps {
  libros: LibroCarrito[];
}

export interface Libros {
  id: number,
  id_categoria: number,
  portada_url: string,
  titulo: string,
  autor: string,
  fecha: Date,
  sinopsis: string,
  precio: number,
  stock: number,
  cantidad: number,
}

export interface LibrosCover {
  portada_url: string,
  titulo: string,
  width: string,
  heigth: string,
}

export interface DetalleCarrito {
  id_carrito: number | null,
  id_book: number | null,
  cantidad: number | null,
}

export interface CartContextType {
  librosCarrito: LibroCarrito[] | undefined;
  agregarAlCarrito: (libro: Libros) => Promise<void>;
  eliminarDelCarrito: (id_book: number | null) => Promise<void>;
  cambiarCantidad: (id_book: number, cantidad: number) => Promise<void>;
  vaciarCarrito: () => void;
  actualizarStock: (id_book: number, stock: number) => void;
  cantidadTotal: number | undefined;
}

export interface ProtectedRuleProps {
  children: ReactNode,
  onlyAdmin: boolean,
  onlyEmpleado: boolean,
}