
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
