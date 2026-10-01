import { useState } from "react";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TextBox } from "../../components/Box";
import { post } from "../../config/api";
import { useAuth, useError } from "../../services/useAuth";

export function Registro({ formData, setFormData, setRegistrar, hashPassword }) {
  const buttonRegisterDisable = formData.some(
    x => !x.value?.trim()
  );
  const [registerErrors, setRegisterErrors] = useState({});
  const hayRegisterErrores = Object.values(registerErrors).some(error => error);

  const navigate = useNavigate();
  const { showError } = useError();
  const { setUser } = useAuth();


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
    let response = {};

    const password = formData.find(x => x.key === "password").value;
    const confPassword = formData.find(x => x.key === "confPassword").value;

    if (password === confPassword) {
      const usuario = {
        nombre_usuario: formData.find(x => x.key === "nombre").value,
        email: formData.find(x => x.key === "email").value,
        password: await hashPassword(password)
      };

      response = await post("auth/register", usuario);
    }

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
    <h1 className="titulo" >REGISTRO</h1>
    {formData.map((x, index) =>
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
      <a className="Button Registro" onClick={(e) => {
        setRegistrar(!e);
        formData.map(x => { x.value = ""; });
        formData.map(x => { x.value = ""; });
      }} >Iniciar Sesión</a>
    </Row>
  </>);
}