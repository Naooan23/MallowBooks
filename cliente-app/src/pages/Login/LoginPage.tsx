import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Esquinas from "../../assets/Esquinas Login.png";
import MascotaLogin from "../../assets/MascotaLogin.jpg";
import { BackGroundImage } from "../../components/BackGroundImage.js";
import { useAuth } from "../../services/useAuth.js";
import "./Login.css";
import { Login } from "./Login.js";
import type { LoginPageFormDataProps } from "./LoginTypes.js";
import { Registro } from "./Registro.js";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
  const [formData, setFormData] = useState<LoginPageFormDataProps[]>([
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
const navigate = useNavigate();
  async function hashPassword(password: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray
      .map(byte => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  useEffect(() => {
    setUser(null);

  }, []);

  return (
    <BackGroundImage
      image={Esquinas}
      color={"var(--color-beige-texto)"}
    >
       <button className="Volver" onClick={() => navigate("/")} >← Volver</button>
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
