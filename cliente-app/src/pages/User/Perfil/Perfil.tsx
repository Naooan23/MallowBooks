import { useEffect, useRef, useState } from "react";
import { Row } from "react-bootstrap";
import Mascota from '../../../assets/Logo Perfil.jpeg';
import { Loading, TextBox } from "../../../components/Box";
import { get, put } from "../../../config/api";
import { useAuth, useError } from "../../../services/useAuth";
import { hashPassword } from "../../Login/LoginTypes";
import './PerfilStyles.css';
import type { CampoFormulario, UserInfoProps } from "./Types";

export default function Perfil() {
  const { user, setUser } = useAuth();
  const { showError } = useError();
  const [userInfo, setUserInfo] = useState<UserInfoProps>();
  const [loading, setLoading] = useState<boolean>(false);
  const [seguridadErrors, setSeguridadErrors] = useState<boolean>(false);
  const [preferenciasErrors, setPreferenciasErrors] = useState<boolean>(false);
  const [resetSeguridadKey, setResetSeguridadKey] = useState(0);
  const omitirValidacionSeguridad = useRef(false);
  const [formSeguridad, setFormSeguridad] = useState<CampoFormulario[]>(
    [
      { key: "password", label: "Contraseña Actual", value: userInfo?.password ?? "", touched: false, type: "password", disabled: true },
      { key: "newPassword", label: "Nueva Contraseña", value: "", touched: false, type: "password", disabled: false },
      { key: "confPassword", label: "Confirmar Contraseña", value: "", touched: false, type: "password", disabled: false },
    ]
  );
  const [formPreferencias, setFormPreferencias] = useState<CampoFormulario[]>(
    [
      { key: "nombre", label: "Nombre", value: userInfo?.nombre ?? "", touched: false, type: "text", disabled: false },
      { key: "email", label: "Correo", value: userInfo?.email ?? "", touched: false, type: "email", disabled: false },
    ]
  );
  const disableSeguridad = formSeguridad.some(x => !x.value?.trim()) || Object.values(seguridadErrors).some(err => err);
  const disablePreferencias = formPreferencias.some(x => !x.value?.trim()) || Object.values(preferenciasErrors).some(err => err);

  const getUserInfo = async () => {
    if (!user?.id_user) return;

    setLoading(true);

    try {
      const response = await get("usuarios", user.id_user);
      setUserInfo(response);
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);

      showError({
        success: false,
        message: "No se pudieron cargar los datos del usuario.",
      });
    } finally {
      setLoading(false);
    }
  };

  const actualizarSeguridad = (index: number, newValue: string) => {
    setFormSeguridad(prev =>
      prev.map((item, i) =>
        i === index
          ? { ...item, value: newValue, touched: true }
          : item
      )
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actualizarPreferencias = (index: number, newValue: any) => {
    setFormPreferencias(prev =>
      prev.map((item, i) =>
        i === index
          ? { ...item, value: newValue, touched: true }
          : item
      )
    );
  };

  const getField = (form: CampoFormulario[], key: string): CampoFormulario | undefined => {
    return form.find(x => x.key === key);
  };

  const handleGuardarSeguridad = async () => {
    const newPassword = await hashPassword(getField(formSeguridad, "newPassword")?.value ?? "");
    const confPassword = await hashPassword(getField(formSeguridad, "confPassword")?.value ?? "");

    if (newPassword !== confPassword) {
      showError({
        success: false,
        message: "Las contraseñas no coinciden",
      });
      return;
    }

    const response = await put("password", { id_user: user?.id_user, new_Password: newPassword, });

    showError({
      message: "Contraseña actualizada",
      success: true,
    });

    omitirValidacionSeguridad.current = true;

    setFormSeguridad(prev =>
      prev.map(item =>
        item.key === "password"
          ? item
          : { ...item, value: "", touched: false }
      )
    );

    setResetSeguridadKey(prev => prev + 1);
    setSeguridadErrors(false);
    setUser(response);
  };

  const handleGuardarPreferencias = async () => {
    const response = await put("user", {
      id_user: user?.id_user,
      nombre: getField(formPreferencias, "nombre")?.value ?? "",
      email: getField(formPreferencias, "email")?.value ?? "",
    });

    console.log("Respuesta del servidor:", response);

    setUser(response);

    setFormPreferencias(prev =>
      prev.map(item => ({
        ...item,
        value:
          item.key === "nombre"
            ? response.nombre_user ?? response.nombre ?? ""
            : response.email ?? "",
        touched: false,
      }))
    );

    setPreferenciasErrors(false);

    showError({
      message: "Preferencias actualizadas",
      success: true,
    });
  };

  const UseEf1 = () => {
    if (!user?.id_user) return;
    getUserInfo();
  }

  const UseEf2 = () => {
    if (!userInfo) return;

    setFormSeguridad((prev) =>
      prev.map((item) =>
        item.key === "password"
          ? { ...item, value: userInfo.password ?? "" }
          : item
      )
    );

    setFormPreferencias((prev) =>
      prev.map((item) => {
        if (item.key === "nombre") return { ...item, value: userInfo.nombre ?? "" };
        if (item.key === "email") return { ...item, value: userInfo.email ?? "" };

        return item;
      })
    );
  }

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    UseEf1();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id_user]);

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    UseEf2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <div className="profile-container">
      <h1 className="profile-title">Mi Perfil</h1>

      <div className="profile-grid">
        <div className="profile-card user-info-card">
          <div className="avatar-section">
            <i className="bi bi-person-circle" />
          </div>

          <h2 className="user-name">{userInfo?.nombre ?? "Usuario"}</h2>
          <p className="user-email">{userInfo?.email ?? ""}</p>

          <div className="badge-role">
            <span className="check-icon">✓</span> USUARIO
          </div>

          <p className="member-since">MIEMBRO DESDE: OCTUBRE 2024</p>

          <div className="illustration-container">
            <img
              src={Mascota}
              style={{ width: "10rem" }}
              alt="Mallow Books Mascot"
            />
            <p className="member-since-sub">MIEMBRO DESDE: OCTUBRE 2024</p>
          </div>
        </div>

        <div className="profile-card">
          <Row>
            <h2 className="section-header">AJUSTES DE SEGURIDAD Y DATOS</h2>
          </Row>
          <div className="forms-group">
            <div className="form-section" style={{ minWidth: 0, overflowWrap: "break-word" }}            >
              <h3 className="section-subtitle">SEGURIDAD DE LA CUENTA</h3>
              <TextBox
                className={formSeguridad.some((x) => x.disabled) ? "disable" : ""}
                items={formSeguridad.map((x, index) => ({
                  key: x.key,
                  label: x.label,
                  type: x.type,
                  value: x.value,
                  touched: x.touched,
                  disabled: x.disabled ?? false,
                  onValueChange: (newValue: string) =>
                    actualizarSeguridad(index, newValue),
                }))}
                login={false}
                styleComponent={{
                  fontFamily: "var(--heading)",
                  fontWeight: 700,
                  marginTop: 0,
                  minWidth: 0,
                }}
                resetKey={resetSeguridadKey}
                onErrorChange={(hasError) => {
                  if (omitirValidacionSeguridad.current) {
                    omitirValidacionSeguridad.current = false;
                    return;
                  }

                  setSeguridadErrors(hasError);
                }}
              />

              <div className="form-row flex-end-row" style={{ marginTop: "1rem" }}>
                <button
                  className="btn-primary"
                  onClick={handleGuardarSeguridad}
                  style={{ flex: "1", height: "40px" }}
                  disabled={disableSeguridad}
                >
                  GUARDAR CAMBIOS
                </button>
              </div>
            </div>

            <div className="form-section" style={{ minWidth: 0, paddingLeft: "1rem", boxSizing: "border-box" }}>
              <h3 className="section-subtitle">PREFERENCIAS DE LA CUENTA</h3>
              <TextBox
                className=""
                items={formPreferencias.map((x, index) => ({
                  key: x.key,
                  label: x.label,
                  type: x.type,
                  value: x.value,
                  touched: x.touched,
                  disabled: x.disabled ?? false,
                  onValueChange: (newValue: string) =>
                    actualizarPreferencias(index, newValue),
                }))}
                login={false}
                styleComponent={{
                  fontFamily: "var(--heading)",
                  fontWeight: 700,
                  marginTop: 0,
                  minWidth: 0,
                }}
                resetKey={null}
                onErrorChange={(hasError) => {
                  setPreferenciasErrors(hasError);
                }}
              />

              <div
                className="form-actions-right"
                style={{ marginTop: "1rem" }}
              >
                <button
                  className="btn-primary"
                  onClick={handleGuardarPreferencias}
                  disabled={disablePreferencias}
                >
                  ACTUALIZAR PREFERENCIAS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading && <Loading />}

    </div >
  );
}