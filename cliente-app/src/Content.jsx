import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./components/menu/DashboardSidebar";
import AppTopBar from "./components/menu/TopBar";

export default function Content({ route }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(0);

  const tieneSideBar = route.sidebar != null && route.sidebar != undefined;

  return (
    <>
      {tieneSideBar && (
        <DashboardSidebar
          sidebar={route.sidebar}
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />
      )}
      <div
        className={tieneSideBar ? "page-content" : "total"}
        style={
          tieneSideBar
            ? { marginLeft: "17.5vw" }
            : { marginLeft: "0vw" }
        }
      >
        <AppTopBar hayLogo={!tieneSideBar} />

        <main>
          <Outlet context={{
            search,
            setSearch,
            filter,
            setFilter,
          }} />
        </main>
      </div>
    </ >
  );
}