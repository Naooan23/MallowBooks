import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Esquinas from "../../assets/Esquinas Login.png";
import MascotaLogin from "../../assets/MascotaLogin.jpg";
import { BackGroundImage } from "../../components/BackGroundImage.jsx";
import { useAuth } from "../../services/useAuth.jsx";
import "./Login.css";
import { Login } from "./Login.jsx";
import { Registro } from "./Registro.jsx";


export default function LoginPage() {
  const [formData, setFormData] = useState([
    { key: "email", nombre: "Correo", value: "", touched: false, type: "email" },
    { key: "password", nombre: "Contraseña", value: "", touched: false, type: "password" },
  ]);
  const [formDataRegistro, setFormDataRegistro] = useState([
    { key: "nombre", nombre: "Nombre", value: "", touched: false, type: "text" },
    { key: "email", nombre: "Correo", value: "", touched: false, type: "email" },
    { key: "password", nombre: "Contraseña", value: "", touched: false, type: "password" },
    { key: "confPassword", nombre: "Confirmar Contraseña", value: "", touched: false, type: "password" },
  ]);
  const [registrar, setRegistrar] = useState(false);
  const { setUser } = useAuth();

  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray
      .map(byte => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  useEffect(() => {
    setUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BackGroundImage
      image={Esquinas}
      color={"var(--color-beige-texto)"}
    >
      <Row className="rowLogin">
        <Col
          className="col-Login-Form"
        >
          <div className="col-vw-responsive Login-Form">
            {!registrar && (
              <Login formData={formData} setFormData={setFormData} formDataRegistro={formDataRegistro} setRegistrar={setRegistrar} hashPassword={hashPassword} />
            )}
            {registrar && (
              <Registro formData={formDataRegistro} setFormData={setFormDataRegistro} setRegistrar={setRegistrar} hashPassword={hashPassword} />
            )}
          </div>
        </Col>
        <Col xl={12} xxl={6} className="col-Imagen">
          <div
            className="Imagen"
            style={{
              backgroundImage: `url(${MascotaLogin})`,
            }}
          />
        </Col>
      </ Row>
    </BackGroundImage>
  );
}
