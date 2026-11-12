import type { CSSProperties, ReactNode } from "react";
import type { UserInfoProps } from "../pages/User/Perfil/Types";

export interface BackGroundImageProps {
  image: string,
  color: string,
  children: ReactNode
}

export interface Item {
  value: string,
  type?: string,
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
  fontSize?: string | number | undefined,
  labelSize?: string;
}

export interface SelectBoxProps {
  item: ReactNode,
  dataSource: Item[],
  onValueChange: (x: string) => void,
  labelSize?: string | number | undefined,
  fontSize?: string | number | undefined,
}

export interface PopUpProps {
  titulo: string,
  children: ReactNode,
  onClose: () => void,
  width?: string,
  height?: string,
}

export interface GridProps {
  loading: boolean,
  usuarios?: UserInfoProps[],
  usuariosPagina?: UserInfoProps[],
  usuariosFiltrados?: UserInfoProps[],
  abrirEditar: (usuario: UserInfoProps) => void,
  eliminarUsuario: (x: number) => void,
  rolesSeleccionados?: string[];
}

export interface CardProps {
  ref?: HTMLDivElement
  classname?: string,
  children: ReactNode,
  width?: string,
  height?: string,
  style?: CSSProperties,
  onClick?: () => void;
}