
import type { Dispatch, SetStateAction } from "react";

export interface CatalogoContext {
  search: string;
  filter: number;
}

export interface DetalleCatalogoContext {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  filter: number;
  setFilter: Dispatch<SetStateAction<number>>;
}

export interface LibroAPI {
  id_book: number;
  id_categoria: number;
  portada_url: string;
  titulo: string;
  autor: string;
  fecha_publicacion: string | null;
  sinopsis: string;
  precio: number;
  stock: number;
}