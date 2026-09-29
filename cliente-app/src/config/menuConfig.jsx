import { Suspense } from "react";
import { AdminPage } from "../pages/Administrador/AdminPage";
import LoginPage from "../pages/Login/LoginPage";
import DashBoard from "../pages/User/Dashboard/DashBoard";
import Estadistica from "../pages/User/Estadistica";
import Perfil from "../pages/User/Perfil";

const withSuspense = (Component) => (
  <Suspense fallback={
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        padding: "0rem",
      }}
    >
      Cargando...
    </div>
  }>
    {Component}
  </Suspense>
);

export const appRoutes = [
  {
    path: "/login",
    label: "lOGIN",
    element: withSuspense(<LoginPage />),
    menu: false,
  },
  {
    icon: <i className="bi bi-layout-wtf" />,
    path: "/dashboard",
    label: "Dashboard",
    element: withSuspense(<DashBoard />),
    menu: true,
    admin: false,
  },
  {
    icon: <i className="bi bi-bar-chart" />,
    path: "/estadisticas",
    label: "Estadisticas",
    element: withSuspense(<Estadistica />),
    menu: true,
    admin: false,
  },
  {
    icon: <i className="bi bi-person-circle" />,
    path: "/perfil",
    label: "Perfil",
    element: withSuspense(<Perfil />),
    menu: true,
    admin: false,
  },
  {
    icon: <i className="bi bi-layout-wtf" />,
    path: "/admin",
    label: "Admin",
    element: withSuspense(<AdminPage />),
    menu: true,
    admin: true,
  },
];

export const CerrarSesionRoute = {
  icon: <i className="bi bi-box-arrow-right"></i>,
  path: "/exit",
  label: "Cerrar Sesión",
};
