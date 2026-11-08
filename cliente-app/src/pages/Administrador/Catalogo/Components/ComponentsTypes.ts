import type { Libros } from "../../../../services/ServicesTypes";

export interface CardLibroProps {
  data: Libros;
  classname?: string;
  onClick: () => void;
  onDelete: (x: number) => Promise<void>;
  CoverWidth: string;
  CoverHeigth: string;
}

export interface CardLibroNuevoProps {
  classname?: string;
  onClick: () => void;
  CoverWidth: string;
  CoverHeigth: string;
}

