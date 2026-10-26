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
import { Navbar } from "../MainPage/NavBar.js";
import { Footer } from "../../components/Footer.js";
import LoginBackground from "../../assets/Login.png";

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginPageFormDataProps[]>([
    { key: "email", label: "Correo", value: "", touched: false, type: "email" },
    {
      key: "password",
      label: "Contraseña",
      value: "",
      touched: false,
      type: "password",
    },
  ]);
  const [formDataRegistro, setFormDataRegistro] = useState<
    LoginPageFormDataProps[]
  >([
    { key: "nombre", label: "Nombre", value: "", touched: false, type: "text" },
    { key: "email", label: "Correo", value: "", touched: false, type: "email" },
    {
      key: "password",
      label: "Contraseña",
      value: "",
      touched: false,
      type: "password",
    },
    {
      key: "confPassword",
      label: "Confirmar Contraseña",
      value: "",
      touched: false,
      type: "password",
    },
  ]);
  const [registrar, setRegistrar] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();
  async function hashPassword(password: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }
  const navigateTo = (sectionId: string) => {
    if (sectionId === "login") {
      window.location.href = "/login";
      return;
    }
    if (sectionId === "inicio") {
      window.location.href = "/";
      return;
    }
    if (sectionId === "register") {
      window.location.href = "/register";
      return;
    }

    const section = document.getElementById(sectionId);

    section?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  useEffect(() => {
    setUser(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* <BackGroundImage
      image={Esquinas}
      color={"var(--color-beige-texto)"}
    > */}
      <Navbar />

      <main className="login-main">
        <img src={LoginBackground} alt="" className="login-background" />
        <div className="Login-Container">
          <div className="Login-Form">
            {!registrar && (
              <Login
                formData={formData}
                setFormData={setFormData}
                formDataRegistro={formDataRegistro}
                setRegistrar={setRegistrar}
                hashPassword={hashPassword}
              />
            )}
            {registrar && (
              <Registro
                formData={formDataRegistro}
                setFormData={setFormDataRegistro}
                formDataRegistro={null}
                setRegistrar={setRegistrar}
                hashPassword={hashPassword}
              />
            )}
          </div>
        </div>
        {/* <Col xl={12} xxl={6} className="col-Imagen">
          <div
            className="Imagen"
            style={{
              backgroundImage: `url(${MascotaLogin})`,
            }}
          />
        </Col> */}
      </main>

      {/* </BackGroundImage> */}
      <Footer
        onNavigate={navigateTo}
        onOpenPrivacy={() => {
          console.log("Abrir políticas de privacidad");
        }}
        onOpenFaq={() => {
          console.log("Abrir preguntas frecuentes");
        }}
        onOpenContact={() => {
          console.log("Abrir términos de compra");
        }}
      />
    </>
  );
}
