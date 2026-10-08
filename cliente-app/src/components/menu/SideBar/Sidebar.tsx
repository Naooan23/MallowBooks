import { useState } from "react";
import Logo from "../../../assets/Logo.jpg";
import "./Sidebar.css";
import type { SideBarProps } from "./TypesSideBar";

export default function Sidebar<T extends object>({ sidebar: SidebarComponent, sidebarProps, }: SideBarProps<T>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`dashboard-sidebar ${sidebarOpen ? "sidebar-open" : ""
          }`}
      >
        <div className="sidebar-logo">
          <img src={Logo} className="logo" alt="Mallow Books" />
        </div>

        <SidebarComponent
          {...sidebarProps}
        />
      </aside>
    </>
  );
}