import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { appRoutes } from "../../Routes";
import Logo from "../../assets/Logo.png";
import "./menu/AppSideBar.css";
import MenuButtonMovil from "./menu/MenuButtonMovil.jsx";
import MenuDesktop from "./menu/MenuDesktop.jsx";
import MenuMovil from "./menu/MenuMovil.jsx";

export default function AppSidebar() {
  const [open, setOpen] = useState(false);
  const [colSize, setColSize] = useState(0);

  const DefinirRutas = (items) => {
    if (items <= 4) {
      setColSize(3);
    } else {
      setColSize(4);
    }
  };

  useEffect(() => {
    DefinirRutas(appRoutes.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appRoutes, colSize]);

  return (
    <>
      <div
        style={{
          height: "100vh",
          backgroundColor: !open ? "#f8f9fa" : "transparent",
        }}
      >
        <Row
          style={{
            display: "flex",
            justifyContent: open ? "flex-end" : "flex-start",
            backgroundColor: "#f8f9fa",
            width: !open ? "50%" : "107vw",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: open ? "end" : "start",
              marginTop: open ? "0.5rem" : "0rem",
              marginRight: open ? "1rem" : "0rem",
              marginLeft: open ? "1rem" : "0rem",
            }}
          >
            {/* Botón visible solo en móvil */}
            <MenuButtonMovil props={{ open: open, setOpen: setOpen }} />
          </Col>
        </Row>

        {/* Menú móvil desplegable */}
        <MenuMovil
          colSize={colSize}
          Logo={Logo}
          open={open}
          onClick={() => setOpen(!open)} />

        {/* Sidebar fijo en desktop */}
        <MenuDesktop Logo={Logo} />
      </div>
    </>
  );
}
