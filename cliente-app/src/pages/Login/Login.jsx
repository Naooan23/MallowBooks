import { useState } from "react";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TextBox } from "../../components/Box";
import { authService } from "../../config/api";
import { useAuth, useError } from "../../services/useAuth";

export function Login({ formData, setFormData, formDataRegistro, setRegistrar, hashPassword }) {
  const [loginErrors, setLoginErrors] = useState({});

  let buttonDisable = formData.some(
    x => !x.value?.trim()
  );

  const hayLoginErrores = Object.values(loginErrors).some(error => error);

  const { setUser } = useAuth();
  const { showError } = useError();
  const navigate = useNavigate();

  const ActualizarForm = (index, newValue) => {
    setFormData(prev => {
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
    const email = formData.find(x => x.key === "email").value;
    const passwordOriginal = formData.find(x => x.key === "password").value;
    const password = await hashPassword(passwordOriginal);

    const response = await authService.login(email, password);

    if (response.success) {
      setUser(response.usuario);
      if (response.usuario) {
        if (response.usuario.rol === "admin") navigate("/admin");
        else navigate("/dashboard");
      }
    }

    if (response.message !== "") showError(response);
  };
  return (<>
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
      <a className="Button Registro" onClick={(e) => {
        setRegistrar(e);
        formData.map(x => { x.value = ""; });
        formDataRegistro.map(x => { x.value = ""; });
      }}>Registrarse</a>
    </Row>
  </>
  )
}