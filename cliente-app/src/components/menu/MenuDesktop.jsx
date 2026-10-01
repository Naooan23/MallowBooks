import { Col, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { appRoutes } from "../../config/menuConfig";
import { useAuth } from "../../services/useAuth";
import "./TopBar.css";

export default function MenuDesktop({ hayLogo, Logo }) {
  const { user } = useAuth();

  const esAdmin = user === null ? false : user?.rol === "admin";

  const rutasFiltradas = appRoutes.filter((route) =>
    esAdmin
      ? route.menu === true && route.admin === true
      : route.menu === true && route.admin !== true
  );

  return (
    <div className="sidebar">
      {hayLogo && (
        <Col xs={2} className="sidebar-logo" style={{ justifyContent: "left", width: "17.6vw" }}>
          <img src={Logo} alt="logo" width="50" />
        </Col>
      )}

      <Nav className="sidebar-nav">
        {rutasFiltradas.map((route) => (
          <Nav.Link
            as={NavLink}
            to={route.path}
            key={route.label}
            className="sidebar-link"
          >
            <div className="d-flex align-items-center">
              <span className="nav-link-icon me-2">{route.icon}</span>
              <span className="nav-label">{route.label}</span>
            </div>
          </Nav.Link>
        ))}

        {/* <Nav.Link
          className="sidebar-link-cerrarSesion"
          onClick={() => navigate("/login")}
        >
          <div className="d-flex align-items-center">
            <span
              className="me-2"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {CerrarSesionRoute.icon}
            </span>

            {CerrarSesionRoute.label}
          </div>
        </Nav.Link> */}
      </Nav>

      <Col xs={1} className="sidebar-profile">
        <i className="bi bi-person-circle" />
      </Col>
    </div >
  );
}