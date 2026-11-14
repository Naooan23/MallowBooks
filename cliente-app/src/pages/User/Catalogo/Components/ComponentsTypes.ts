import type { Libros } from "../../../../services/ServicesTypes";

export interface CardLibroProps {
  data: Libros;
  classname?: string;
  onClick: () => void;
  CoverWidth: string;
  CoverHeigth: string;
  isReadOnly?: boolean; //para el empleado, no se puede agregar al carrito, solo ver detalles
}