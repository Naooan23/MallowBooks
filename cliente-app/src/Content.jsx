import { Outlet } from "react-router-dom";
import AppSidebar from "./components/menu/SideBar";

export default function Content() {

  return (
    <div className="d-flex">
      <div style={{ height: "100vh" }}>
        <AppSidebar />
      </div>

      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}
