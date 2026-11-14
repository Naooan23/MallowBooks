import { useState } from "react";
import Logo from "../../../pages/MainPage/Logo_t.png";
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

        <div className="sidebar-modern">
          <SidebarComponent
            {...sidebarProps}
          />
        </div>
      </aside>
    </>
  );
}