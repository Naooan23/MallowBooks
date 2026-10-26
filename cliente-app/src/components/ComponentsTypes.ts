import type { ReactNode } from "react";
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

export interface TextBoxItem {
  key: string;
  label: string;
  type: string;
  value: string;
  touched: boolean;
  disabled: boolean;
  onValueChange: (newValue: string) => void;
}

export interface TextBoxProps {
  className?: string;
  items: TextBoxItem[];
  login?: boolean;
  styleComponent?: React.CSSProperties;
  resetKey: number | undefined | null;
  onErrorChange: (hasError: boolean) => void;
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