import { useCallback, useState } from "react";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TextBox } from "../../components/Box";
import { post } from "../../config/api";
import { useAuth, useError } from "../../services/useAuth";
import type { LoginProps, RegisterResponse } from "./LoginTypes";

export function Registro({ formData, setFormData, setRegistrar, hashPassword, }: LoginProps) {
  const [registerErrors, setRegisterErrors] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const { showError } = useError();
  const { setUser } = useAuth();

  const buttonRegisterDisable = formData.some((x) => !x.value?.trim()) || Object.values(registerErrors).some(Boolean);

  const actualizarForm = (index: number, newValue: string) => {
    setFormData((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, value: newValue, touched: true }
          : item
      )
    );
  };

  const sendData = async () => {
    const password = formData.find((x) => x.key === "password")?.value ?? "";

    const confPassword = formData.find((x) => x.key === "confPassword")?.value ?? "";

    if (password !== confPassword) {
      showError({
        success: false,
        message: "Las contraseñas no coinciden",
      });
      return;
    }

    try {
      const usuario = {
        nombre: formData.find((x) => x.key === "nombre")?.value ?? "",
        email: formData.find((x) => x.key === "email")?.value ?? "",
        password: await hashPassword(password),
      };

      const response: RegisterResponse = await post("auth/register", usuario);

      if (response.success && response.usuario) {
        setUser(response.usuario);

        navigate(
          response.usuario.rol === "admin"
            ? "/admin-dashboard"
            : response.usuario.rol === "empleado"
              ? "/empleado-dashboard"
              : "/dashboard");

        return;
      }

      if (response.message) {
        showError(response);
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);

      showError({
        success: false,
        message: "No se pudo completar el registro. Inténtalo de nuevo.",
      });
    }
  };

  const cambiarAInicioSesion = () => {
    setFormData((prev) =>
      prev.map((item) => ({
        ...item,
        value: "",
        touched: false,
      }))
    );

    setRegisterErrors({});
    setRegistrar(false);
  };

  const handleErrorChange = useCallback((hasError: boolean) => {
    setRegisterErrors((prev) => {
      if (prev.general === hasError) {
        return prev;
      }

      return { general: hasError };
    });
  }, []);

  return (
    <>
      <h1 className="titulo">REGISTRO</h1>

      <TextBox
        items={formData.map((item, index) => ({
          key: item.key,
          value: item.value,
          type: item.type,
          label: item.label ?? "",
          touched: item.touched,
          disabled: item.disabled ?? false,
          onValueChange: (newValue: string) =>
            actualizarForm(index, newValue),
        }))}
        login={false}
        styleComponent={{
          fontFamily: "var(--heading)",
          fontWeight: 700,
        }}
        onErrorChange={handleErrorChange}
        resetKey={null}
        fontSize={"1.3rem"}
      />

      <Row
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <button
          className="Button LogIn"
          onClick={sendData}
          disabled={buttonRegisterDisable}
        >
          Registrar
        </button>

        <button
          type="button"
          className="Button Registro"
          onClick={cambiarAInicioSesion}
        >
          Iniciar Sesión
        </button>
      </Row>
    </>
  );
}