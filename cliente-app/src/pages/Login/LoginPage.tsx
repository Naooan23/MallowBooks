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


export default function LoginPage() {
  const [formData, setFormData] = useState<LoginPageFormDataProps[]>([
    { key: "email", label: "Correo", value: "", touched: false, type: "email" },
    { key: "password", label: "Contraseña", value: "", touched: false, type: "password" },
  ]);
  const [formDataRegistro, setFormDataRegistro] = useState<LoginPageFormDataProps[]>([
    { key: "nombre", label: "Nombre", value: "", touched: false, type: "text" },
    { key: "email", label: "Correo", value: "", touched: false, type: "email" },
    { key: "password", label: "Contraseña", value: "", touched: false, type: "password" },
    { key: "confPassword", label: "Confirmar Contraseña", value: "", touched: false, type: "password" },
  ]);
  const [registrar, setRegistrar] = useState(false);
  const { setUser } = useAuth();

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
              <Registro formData={formDataRegistro} setFormData={setFormDataRegistro} formDataRegistro={null} setRegistrar={setRegistrar} hashPassword={hashPassword} />
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
