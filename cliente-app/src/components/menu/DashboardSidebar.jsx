import { useState } from "react";
import Logo from "../../assets/Logo.jpg";
import "./DashboardSidebar.css";

export default function DashboardSidebar({ sidebar: Sidebar, search, setSearch, filter, setFilter }) {
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

        <Sidebar
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />
      </aside>
    </>
  );
}