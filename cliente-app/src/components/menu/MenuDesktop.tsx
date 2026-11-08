import { Col, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

import { useState } from "react";
import { appRoutes } from "../../config/menuConfig";
import { useAuth } from "../../services/useAuth";
import "./MenuBars.css";
import type { MenuDesktopProps } from "./MenuTypes";

export default function MenuDesktop({ hayLogo, Logo }: MenuDesktopProps) {
  const { user } = useAuth();
  const [datosPerfil, setDatosPerfil] = useState(false);
  const navigate = useNavigate();

  const esAdmin = user?.rol === "admin";
  const esEmpleado = user?.rol === "empleado";

  const rutasFiltradas = appRoutes.filter(route => {
    if (!route.menu) return false;

    if (esAdmin) return route.admin === true;

    if (esEmpleado) return route.empleado === true;

    return route.menu === true && route.admin === false && route.empleado === false;
  });

  return (
    <div className="sidebar">
      {(hayLogo || hayLogo == null) && (
        <Col
          className="sidebar-logo"
          style={{
            flex: "0 0 auto",
            width: "auto",
            margin: 0,
            padding: 0
          }}
        >
          <img src={Logo} alt="logo" width="69" />
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
      </Nav>

      <div className="sidebar-profile">
        <button
          type="button"
          className={`sidebar-profile-button ${datosPerfil ? "profile-active" : ""
            }`}
          onClick={() => setDatosPerfil((actual) => !actual)}
          aria-label="Abrir perfil"
          aria-expanded={datosPerfil}
        >
          <i className="bi bi-person-circle" />
        </button>

        {datosPerfil && (
          <div className="profile-popup">
            <div className="profile-popup-header">
              <div className="profile-avatar">
                <i className="bi bi-person-fill" />
              </div>

              <div className="profile-user-info">
                <span className="profile-user-name">
                  {user?.nombre ?? "Usuario"}
                </span>

                <span className="profile-user-email">
                  {user?.email ?? "Sin correo registrado"}
                </span>
              </div>
            </div>

            <div className="profile-popup-divider" />

            <div className="profile-role">
              <i className="bi bi-shield-check" />
              <span>
                {esAdmin
                  ? "Administrador"
                  : esEmpleado
                    ? "Empleado"
                    : "Usuario"}
              </span>
            </div>

            <button
              type="button"
              className="profile-logout-button"
              onClick={() => {
                setDatosPerfil(false);
                navigate('/login');
              }}
            >
              <i className="bi bi-box-arrow-right" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        )}
      </div >
    </div >
  );
}