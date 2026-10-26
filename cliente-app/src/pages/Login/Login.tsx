import { useState } from "react";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TextBox } from "../../components/Box";
import { authService } from "../../config/api";
import { useAuth, useError } from "../../services/useAuth";
import type { ActualizarProps, LoginProps } from "./LoginTypes";

export function Login({ formData, setFormData, formDataRegistro, setRegistrar, hashPassword }: LoginProps) {
  const [loginErrors, setLoginErrors] = useState({});

  const buttonDisable = formData.some(
    x => !x.value?.trim()
  );

  const hayLoginErrores = Object.values(loginErrors).some(error => error);

  const { setUser } = useAuth();
  const { showError } = useError();
  const navigate = useNavigate();


  const ActualizarForm = ({ index, newValue }: ActualizarProps) => {
    setFormData((prev) =>
      prev.map((campo, i) =>
        i === index
          ? {
            ...campo,
            value: newValue,
            touched: true,
          }
          : campo
      )
    );
  };

  const sendData = async () => {
    const email = formData.find(x => x.key === "email")?.value;
    const passwordOriginal = formData.find(x => x.key === "password")?.value;
    const password = await hashPassword(passwordOriginal ?? "");

    const response = await authService.login(email ?? "", password ?? "");

    if (response.success) {
      setUser(response.usuario);
      if (response.usuario) {
        if (response.usuario.rol === "admin") navigate("/admin-dashboard");
        else navigate("/dashboard");
      }
    }

    if (response.message !== "") showError(response);
  };
  return (<>
    <h2 className="titulo" >BIENVENIDO AL INICIO DE SESIÓN</h2>
    {formData.map((x, index) =>
      <TextBox
        className={""}
        key={x.key}
        item={{
          value: x.value,
          type: x.type,
          label: x.label ?? "",
        }} login={true}
        styleComponent={{
          fontFamily: "var(--heading)",
          fontWeight: 700
        }}
        onValueChange={(newValue) => ActualizarForm({ index, newValue })}
        onErrorChange={(hasError) => {
          setLoginErrors(prev => ({
            ...prev,
            [x.key]: hasError
          }));
        }} />
    )}
    <Row style={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
      <button className="Button LogIn" onClick={sendData} disabled={buttonDisable || hayLoginErrores} >Iniciar Sesión</button>
      <a className="Button Registro" onClick={(e) => {
        setRegistrar(e != null);
        formData.map(x => { x.value = ""; });
        formDataRegistro?.map(x => { x.value = ""; });
      }}>Registrarse</a>
    </Row>
  </>
  )
}