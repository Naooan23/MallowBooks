import type { Dispatch, SetStateAction } from "react";
import type { LibroCarrito } from "../../../services/ServicesTypes";

export interface DataSelected {
  nombre: string;
  total: number;
}

export interface ResumenProps {
  dataSeleccionada: DataSelected[];
  subtotal: number | undefined;
  cantidadSeleccionada: number;
  onClick: () => void;
}

export interface LibroOrden {
  id_book: number;
  cantidad: number;
}

export interface Orden {
  id_user: number;
  libros: LibroOrden[];
}

export interface ItemCarritoProps {
  item: LibroCarrito;
  setSeleccionados: Dispatch<SetStateAction<number[]>>;
  librosCarrito: LibroCarrito[] | undefined;
  procesandoId: number | null;
  setProcesandoId: Dispatch<SetStateAction<number | null>>;
  seleccionado: boolean;
  procesando: boolean;
}


export interface OrdenCompraProps {
  orden: OrdenGenerada;
  libros: LibroOrdenVista[];
  cliente: string;
  email: string;
  fecha: string;
  onClose: () => void;
}


export interface OrdenGenerada {
  id_orden: number;
  total: number;
  status: string;
}

export interface LibroOrdenVista {
  id_book: number;
  titulo: string;
  autor: string;
  precio: number;
  cantidad: number;
  subtotal: number;
}

export interface OrdenCompraState {
  orden: OrdenGenerada;
  libros: LibroOrdenVista[];
  cliente: string;
  email: string;
  fecha: string;
}