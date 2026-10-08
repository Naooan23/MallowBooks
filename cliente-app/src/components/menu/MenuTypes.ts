import type { Dispatch, SetStateAction } from "react";

export interface MenuButtonMovilProps {
  setOpen: Dispatch<SetStateAction<boolean>>,
  open: boolean
}

export interface MenuDesktopProps {
  hayLogo: boolean,
  Logo: string
}

export interface MenuMovilProps {
  hayLogo: boolean;
  colSize?: number | "auto";
  Logo: string;
  open: boolean;
  onClick: () => void;
}