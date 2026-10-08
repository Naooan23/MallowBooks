import type { ComponentType, Dispatch, SetStateAction } from "react";

export interface SideBarProps<T = object> {
  sidebar: ComponentType<T>;
  sidebarProps?: T;
}

export interface SearchFilterProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  filter: number;
  setFilter: Dispatch<SetStateAction<number>>;
}