import { useEffect, useState } from "react";
import LoginBackground from "../../assets/Login.png";
import { Footer } from "../../components/Footer.js";
import { useAuth } from "../../services/useAuth.js";
import { Navbar } from "../MainPage/NavBar.js";
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

  async function hashPassword(password: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  useEffect(() => {
    setUser(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
      </main>

      <Footer />
    </>
  );
}
