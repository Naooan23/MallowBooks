import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";
import Sidebar from "./components/menu/SideBar/Sidebar";
import TopBar from "./components/menu/TopBar";
import type { AppRoute } from "./config/ConfigTypes";

interface ContentProps {
  route: AppRoute,
}

export default function Content({ route }: ContentProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(0);

  const tieneSideBar = route.sidebar != null;

  return (
    <div className={`content-layout ${tieneSideBar ? "has-sidebar" : ""}`}>

      {route.sidebar && (
        <Sidebar
          sidebar={route.sidebar}
          sidebarProps={{
            search,
            setSearch,
            filter,
            setFilter,
          }}
        />
      )}

      <div className={tieneSideBar ? "page-content" : "total"}>
        <TopBar hayLogo={!tieneSideBar} />

        <main>
          <Outlet context={{
            search,
            setSearch,
            filter,
            setFilter,
          }} />
        </main>
      </div>

      <Footer />

    </div>
  );
}