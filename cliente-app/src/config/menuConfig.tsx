import { Suspense, type ReactNode } from "react";
import { AdminPage } from "../pages/Administrador/AdminPage";
import LoginPage from "../pages/Login/LoginPage";
import Carrito from "../pages/User/Carrito/Carrito";
import Catalogo from "../pages/User/Catalogo/Catalogo.tsx";
import SearchFilter from "../pages/User/Catalogo/Components/SearchFilter.tsx";
import DashBoard from "../pages/User/Dashboard/DashBoard";
import Perfil from "../pages/User/Perfil/Perfil.tsx";
import type { AppRoute } from "./ConfigTypes";

const withSuspense = (Component: ReactNode) => (
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

export const appRoutes: AppRoute[] = [
  {
    path: "/login",
    label: "lOGIN",
    element: withSuspense(<LoginPage />),
    menu: false,
  },
  {
    icon: <i className="bi bi-layout-wtf" />,
    path: "/dashboard",
    label: "Inicio",
    element: withSuspense(<DashBoard />),
    menu: true,
    admin: false,
  },
  {
    icon: <i className="bi bi-collection" />,
    path: "/catalogo",
    label: "Catálogo",
    element: withSuspense(<Catalogo />),
    sidebar: SearchFilter,
    menu: true,
    admin: false,
  },
  {
    icon: <i className="bi bi-cart4" />,
    path: "/carrito",
    label: "Carrito",
    element: withSuspense(<Carrito />),
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
    path: "/admin-dashboard",
    label: "Admin",
    element: withSuspense(<AdminPage />),
    menu: true,
    admin: true,
  },
  {
    icon: <i className="bi bi-layout-wtf" />,
    path: "/empleado-dashboard",
    label: "Inicio",
    element: withSuspense(<DashBoard />),
    menu: true,
    admin: false,
    empleado: true,
  },
  {
    icon: <i className="bi bi-collection" />,
    path: "/empleado-catalogo",
    label: "Catálogo",
    element: withSuspense(<Catalogo />),
    sidebar: SearchFilter,
    menu: true,
    admin: false,
    empleado: true,
  },
];

export const CerrarSesionRoute = {
  icon: <i className="bi bi-box-arrow-right"></i>,
  path: "/exit",
  label: "Cerrar Sesión",
};
