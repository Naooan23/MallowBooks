import type { CSSProperties, ReactNode } from "react";
import type { User } from "../services/ServicesTypes";

export interface BackGroundImageProps {
  image: string,
  color: string,
  children: ReactNode
}

export interface Item {
  value: string,
  type: string,
  label: string,
}

export interface TextBoxProps {
  className: string | null,
  item: Item,
  login: boolean,
  styleComponent: CSSProperties,
  onValueChange: (x: string) => void,
  onErrorChange: (x: boolean) => void,
}

export interface SelectBoxProps {
  item: ReactNode,
  dataSource: [Item],
  onValueChange: (x: string) => void,
}

export interface PopUpProps {
  titulo: string,
  children: ReactNode,
  onClose: () => void,
}

export interface GridProps {
  users: [User],
  editarUser: (x: number) => void,
  eliminarUser: (x: number) => void,
}