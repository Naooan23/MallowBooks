import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Esquinas from "../../assets/Esquinas Login.png";
import MascotaLogin from "../../assets/MascotaLogin.jpg";
import { BackGroundImage } from "../../components/BackGroundImage.jsx";
import { TextBox } from "../../components/Box.jsx";
import { authService, post } from "../../config/api.js";
import { useAuth } from "../../services/useAuth.jsx";
import "./Login.css";


export default function Login() {
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
  let buttonDisable = formData.some(
    x => !x.value?.trim()
  );
  const buttonRegisterDisable = formDataRegistro.some(
    x => !x.value?.trim()
  );
  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});
  const hayLoginErrores = Object.values(loginErrors).some(error => error);
  const hayRegisterErrores = Object.values(registerErrors).some(error => error);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray
      .map(byte => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  const ActualizarForm = (index, newValue) => {
    if (!registrar)
      setFormData(prev => {
        const updated = [...prev];

        updated[index] = {
          ...updated[index],
          value: newValue,
          touched: true
        };

        return updated;
      });
    else
      setFormDataRegistro(prev => {
        const updated = [...prev];

        updated[index] = {
          ...updated[index],
          value: newValue,
          touched: true
        };

        return updated;
      });
  };

  const sendData = async () => {
    let response = {};

    if (!registrar) {
      const email = formData.find(x => x.key === "email").value;
      const passwordOriginal = formData.find(x => x.key === "password").value;
      const password = await hashPassword(passwordOriginal);

      response = await authService.login(email, password);

      if (response.success) setUser(response.usuario);
    }
    else {
      const password = formDataRegistro.find(x => x.key === "password").value;
      const confPassword = formDataRegistro.find(x => x.key === "confPassword").value;

      if (password === confPassword) {
        const usuario = {
          nombre_usuario: formDataRegistro.find(x => x.key === "nombre").value,
          email: formDataRegistro.find(x => x.key === "email").value,
          password: await hashPassword(password)
        };

        response = await post("auth/register", usuario);
        console.log(response);
      }
    }

    if (response.success && response.usuario) {
      if (response.usuario.rol === "admin") navigate("/admin");
      else navigate("/dashboard");
    }
  };

  return (
    <BackGroundImage
      image={Esquinas}
      color={"#F5E8D5FF"}
    >
      <Row className="rowLogin">
        <Col
          className="col-Login-Form"
        >
          <div className="col-vw-responsive Login-Form">
            {!registrar && (
              <>
                <h1 className="titulo" >BIENVENIDO AL INICIO DE SESIÓN</h1>
                {formData.map((x, index) =>
                  <TextBox
                    key={x.key}
                    item={x}
                    type={x.type}
                    touched={x.touched}
                    login={true}
                    style={{
                      fontFamily: "var(--heading)",
                      fontWeight: 700
                    }}
                    onValueChange={(newValue) => ActualizarForm(index, newValue)}
                    onErrorChange={(hasError) => {
                      setLoginErrors(prev => ({
                        ...prev,
                        [x.key]: hasError
                      }));
                    }} />
                )}
                <Row style={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
                  <button className="Button LogIn" onClick={sendData} disabled={buttonDisable || hayLoginErrores} >Iniciar Sesión</button>
                  <a className="Button Registro" onClick={(e) => { setRegistrar(e) }}>Registrarse</a>
                </Row>
              </>
            )}
            {registrar && (
              <>
                <h1 className="titulo" >REGISTRO</h1>
                {formDataRegistro.map((x, index) =>
                  <TextBox
                    key={x.key}
                    item={x}
                    type={x.type}
                    touched={x.touched}
                    login={false}
                    style={{
                      fontFamily: "var(--heading)",
                      fontWeight: 700
                    }}
                    onValueChange={(newValue) => ActualizarForm(index, newValue)}
                    onErrorChange={(hasError) => {
                      setRegisterErrors(prev => ({
                        ...prev,
                        [x.key]: hasError
                      }));
                    }}
                  />
                )}
                <Row style={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
                  <button className="Button LogIn" onClick={sendData} disabled={buttonRegisterDisable || hayRegisterErrores} >Registrar</button>
                  <a className="Button Registro" onClick={(e) => setRegistrar(!e)} >Iniciar Sesión</a>
                </Row>
              </>
            )}
          </div>
        </Col>
        <Col xl={12} xxl={6} className="col-Imagen">
          <div
            className="Imagen"
            style={{
              height: "100%",
              backgroundImage: `url(${MascotaLogin})`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </Col>
      </ Row>
    </BackGroundImage>
  );
}
