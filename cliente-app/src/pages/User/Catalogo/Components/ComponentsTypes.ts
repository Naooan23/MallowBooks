import type { Libros } from "../../../../services/ServicesTypes";

export interface CardLibroProps {
  data: Libros;
  onClick: () => void;
}