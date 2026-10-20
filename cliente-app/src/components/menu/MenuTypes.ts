import type { Dispatch, SetStateAction } from "react";

export interface MenuButtonMovilProps {
  setOpen: Dispatch<SetStateAction<boolean>>,
  open: boolean
}

export interface MenuDesktopProps {
  hayLogo: boolean | null,
  Logo: string
}

export interface MenuMovilProps {
  hayLogo: boolean | null;
  colSize?: number | "auto";
  Logo: string;
  open: boolean;
  onClick: () => void;
}