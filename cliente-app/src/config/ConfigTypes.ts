import type { ComponentType, ReactNode } from "react";


export interface AppRoute {
  path: string;
  label: string;
  element: ReactNode;
  icon?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sidebar?: ComponentType<any>;
  sidebarProps?: Record<string, unknown>;
  menu: boolean;
  admin?: boolean;
  empleado?: boolean;
}
