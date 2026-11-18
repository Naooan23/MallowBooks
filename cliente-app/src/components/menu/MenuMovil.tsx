import { Col, Collapse, Nav, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { appRoutes, CerrarSesionRoute } from "../../config/menuConfig";
import { useAuth } from "../../services/useAuth";
import "./MenuBars.css";
import type { MenuMovilProps } from "./MenuTypes";

export default function MenuMovil({ hayLogo, colSize, Logo, open, onClick }: MenuMovilProps) {
  const { user, setUser } = useAuth();
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
    <>
      <div className="d-sm-none">

        <Collapse in={open}>
          <div
            className="menu-movil p-3"
            style={{
              borderBottomRightRadius: "20px",
              borderBottomLeftRadius: "20px",
            }}
          >
            {hayLogo && (
              <div className="sidebar-logo">
                <img src={Logo} alt="logo" width="120" />
              </div>
            )}

            <Nav className="flex-column" style={{ display: "flex" }}>
              <Row
                className="text-center"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {rutasFiltradas.map((route) => {
                  return (

                    <Col
                      xs={colSize}
                      key={route.label}
                      className="mb-3"
                      style={{ padding: "0rem", borderRadius: "1rem" }}
                    >
                      <Nav.Link
                        as={NavLink}
                        to={route.path}
                        className="sidebar-link"
                        style={{ justifyContent: "center" }}
                      >
                        <div
                          className="d-flex flex-column align-items-center"
                          onClick={onClick}
                        >
                          <span className="mb-1">{route.icon}</span>
                          <span>{route.label}</span>
                        </div>
                      </Nav.Link>
                    </Col>
                  );
                })}
                <Col xs={colSize}>
                  <Nav.Link
                    className="sidebar-link-cerrarSesion-movil w-100"
                    style={{ justifyContent: "center" }}
                    onClick={() => {
                      setUser(null);
                      sessionStorage.removeItem("token");
                      navigate('/login');
                    }}

                  >
                    <div className="d-flex flex-column align-items-center">
                      <span className="mb-1">{CerrarSesionRoute.icon}</span>
                      <span style={{ display: "flex", textAlign: "center" }}>{CerrarSesionRoute.label}</span>
                    </div>
                  </Nav.Link>
                </Col>
              </Row>
            </Nav>
          </div>
        </Collapse>
      </div>
    </>
  );
}
