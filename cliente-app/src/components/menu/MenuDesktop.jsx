import { Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

import { appRoutes, CerrarSesionRoute } from "../../config/menuConfig";
import { useAuth } from "../../services/useAuth";
import "./SideBar.css";

export default function MenuDesktop({ Logo }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const esAdmin = user === null ? false : user?.rol === "admin";

  const rutasFiltradas = appRoutes.filter(route =>
    esAdmin
      ? route.menu === true && route.admin === true
      : route.menu === true && route.admin !== true
  );

  return (
    <>
      <div className="sidebar d-none d-sm-flex flex-column p-3">
        <div className="sidebar-logo">
          <img src={Logo} alt="logo" width="150" />
        </div>

        <Nav className="flex-column flex-grow-1" style={{ borderRadius: "1rem" }}>
          {rutasFiltradas.map((route) => {
            return (
              <Nav.Link
                as={NavLink}
                to={route.path}
                key={route.label}
                className="sidebar-link"
              >
                <div className="d-flex align-items-center">
                  <span className="me-2">{route.icon}</span>
                  {route.label}
                </div>
              </Nav.Link>
            )
          })}

          {/* Cerrar sesión al fondo */}
          <Nav.Link
            className="sidebar-link-cerrarSesion mt-auto"
            onClick={() => navigate('/login')}
          >
            <div className="d-flex align-items-center">
              <span className="me-2" style={{ display: "flex", justifyContent: "center" }}>{CerrarSesionRoute.icon}</span>
              {CerrarSesionRoute.label}
            </div>
          </Nav.Link>
        </Nav>
      </div >
    </>
  );
}
