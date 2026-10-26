import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Esquinas from "../../assets/Esquinas Login.png";
import MascotaLogin from "../../assets/MascotaLogin.jpg";
import { BackGroundImage } from "../../components/BackGroundImage.js";
import { useAuth } from "../../services/useAuth.js";
import "./Login.css";
import { Login } from "./Login.js";
import { hashPassword, type LoginPageFormDataProps } from "./LoginTypes.js";
import { Registro } from "./Registro.js";


export default function LoginPage() {
  const [formData, setFormData] = useState<LoginPageFormDataProps[]>([
    { key: "email", label: "Correo", value: "", touched: false, type: "email", disabled: false },
    { key: "password", label: "Contraseña", value: "", touched: false, type: "password", disabled: false },
  ]);
  const [formDataRegistro, setFormDataRegistro] = useState<LoginPageFormDataProps[]>([
    { key: "nombre", label: "Nombre", value: "", touched: false, type: "text", disabled: false },
    { key: "email", label: "Correo", value: "", touched: false, type: "email", disabled: false },
    { key: "password", label: "Contraseña", value: "", touched: false, type: "password", disabled: false },
    { key: "confPassword", label: "Confirmar Contraseña", value: "", touched: false, type: "password", disabled: false },
  ]);
  const [registrar, setRegistrar] = useState(false);
  const { setUser } = useAuth();

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
