import { useEffect, useMemo, useState } from "react";
import { Button, InputGroup, Table } from "react-bootstrap";
import { Card, LoadingSimple, PopUp, SelectBox, TextBox } from "../../../components/Box";
import { del, get, post, put } from "../../../config/api";
import type { CampoFormulario, UserInfoProps } from "../../User/Perfil/Types";

import { obtenerAnchoLabel } from "../../../components/BoxUtils";
import { useConfirm, useError } from "../../../services/useAuth";
import { hashPassword } from "../../Login/LoginTypes";
import "./Usuarios.css";

type RolUsuario = "user" | "admin" | "empleado";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<UserInfoProps[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [usuarioEditando, setUsuarioEditando] = useState<UserInfoProps | null>(null);
  const [formUsuarios, setFormUsuarios] = useState<CampoFormulario[]>([]);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [limite, setLimite] = useState(10);
  const { showConfirm } = useConfirm();
  const { showError } = useError();
  const fontSize = "1.3rem";


  // Obtener usuarios
  const getUsers = async () => {
    try {
      const data = await get("usuarios", undefined);
      setUsuarios(Array.isArray(data) ? data : []);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error al obtener usuarios:", error);

      showError({
        success: false,
        message:
          error?.response?.data?.detail ||
          "No se pudieron cargar los usuarios.",
      });
    }
  };

  const generarCampos = (usuario?: UserInfoProps) => [
    {
      key: "nombre_user",
      label: "Nombre",
      value: usuario?.nombre_user ?? "",
      touched: false,
      type: "text",
    },
    {
      key: "email",
      label: "Correo electrónico",
      value: usuario?.email ?? "",
      touched: false,
      type: "email",
    },
    {
      key: "password",
      label: "Contraseña",
      value: usuario?.password ?? "",
      touched: false,
      type: "password",
    },
    {
      key: "rol",
      label: "Rol",
      value: usuario?.rol ?? "user",
      touched: false,
      type: "select",
    },
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const usuariosFiltrados = useMemo(() => {
    const texto = busqueda.toLocaleLowerCase().trim();

    return usuarios.filter((u) =>
      [u.nombre_user, u.email, u.rol].some((valor) =>
        String(valor ?? "").toLocaleLowerCase().includes(texto)
      )
    );
  }, [usuarios, busqueda]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(usuariosFiltrados.length / limite)
  );

  const usuariosPagina = usuariosFiltrados.slice(
    (pagina - 1) * limite,
    pagina * limite
  );

  useEffect(() => {
    if (pagina > totalPaginas) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPagina(totalPaginas);
    }
  }, [pagina, totalPaginas]);

  const abrirCrear = () => {
    setFormUsuarios(generarCampos());
    setMostrarPopup(true);
  };

  const abrirEditar = (usuario: UserInfoProps) => {
    setUsuarioEditando(usuario);
    setFormUsuarios(generarCampos(usuario));
    setMostrarPopup(true);
  };

  const cerrarPopup = () => {
    if (loading) return;

    setMostrarPopup(false);
    setUsuarioEditando(null);
    setFormUsuarios([]);
  };

  const cambiarCampo = (key: string, valor: string) => {
    setFormUsuarios((prev) =>
      prev.map((item) =>
        item.key === key
          ? { ...item, value: valor, touched: true }
          : item
      )
    );
  };

  const obtenerValor = (key: string) => String(formUsuarios.find((x) => x.key === key)?.value ?? "");

  const validarFormulario = () => {
    const nombre = obtenerValor("nombre_user");
    const email = obtenerValor("email");
    const password = obtenerValor("password");
    const rol = obtenerValor("rol");

    if (!nombre.trim()) return false;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;

    if (!usuarioEditando && !password.trim()) return false;

    if (!usuarioEditando && password && password.length < 6) return false;
    if (!usuarioEditando && password && !/[A-Z]/.test(password)) return false;
    if (!usuarioEditando && password && !/[0-9]/.test(password)) return false;

    if (!rol) return false;

    return true;
  };

  const guardarUsuario = async () => {
    const validacion = validarFormulario();
    if (!validacion) {
      showError({
        success: false,
        message: "Completa todos los campos correctamente.",
      });
      return;
    }

    setLoading(true);

    try {
      const usuario = {
        nombre_user: obtenerValor("nombre_user").trim(),
        email: obtenerValor("email").trim(),
        password: await hashPassword(obtenerValor("password").trim()),
        rol: obtenerValor("rol"),
      };

      if (usuarioEditando) {
        const usuarioEditado = {
          id_user: usuarioEditando.id_user,
          ...usuario,
        };

        await put("usuarios", usuarioEditado);

        showError({
          success: true,
          message: "Usuario actualizado correctamente.",
        });
      } else {
        await post("usuarios", usuario);

        showError({
          success: true,
          message: "Usuario registrado correctamente.",
        });
      }

      await getUsers();

      setMostrarPopup(false);
      setUsuarioEditando(null);
      setFormUsuarios([]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);

      showError({
        success: false,
        message:
          error?.response?.data?.detail ||
          "Ocurrió un error al guardar el usuario.",
      });
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuario = (id_user: number) => {
    showConfirm(
      "¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.",
      async () => {
        setLoading(true);

        try {
          const response = await del("usuarios", id_user);

          await getUsers();

          showError({
            success: true,
            message:
              response?.message || "Usuario eliminado correctamente.",
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.error("Error al eliminar usuario:", error);

          showError({
            success: false,
            message:
              error?.response?.data?.detail ||
              "No se pudo eliminar el usuario.",
          });
        } finally {
          setLoading(false);
        }
      }
    );
  };

  const anchoLabel = obtenerAnchoLabel(
    ["Nombre", "Correo electrónico", "Contraseña", "Rol"],
    fontSize
  );

  const cambiarCampoRol = (valor: RolUsuario) => {
    cambiarCampo("rol", valor);
  };

  return (
    <div
      style={{
        height: "100%",
        minHeight: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        width="95%"
        height="90%"
      >
        <div className="usuarios-container">
          <div className="usuarios-header-container">
            <h1>Usuarios</h1>

            <div className="usuarios-acciones-header">
              <InputGroup className="usuarios-search-box">
                <InputGroup.Text className="search-icon-bg">
                  <i className="bi bi-search" />
                </InputGroup.Text>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar usuarios..."
                  value={busqueda}
                  onChange={(e) => {
                    setBusqueda(e.target.value);
                    setPagina(1);
                  }}
                />
              </InputGroup>

              <Button
                className="usuarios-btn-agregar"
                onClick={abrirCrear}
              >
                <i className="bi bi-person-plus-fill me-2" />
                Agregar usuario
              </Button>
            </div>
          </div>

          <div className="usuarios-tabla-container">
            <Table responsive hover className="usuarios-tabla">
              <thead>
                <tr>
                  <th>Acciones</th>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Rol</th>
                  <th>Correo electrónico</th>
                  <th>Password</th>
                </tr>
              </thead>

              <tbody>
                {loading && usuarios.length === 0 ? <LoadingSimple /> : usuariosPagina.length > 0 ? (
                  usuariosPagina.map((usuario) => (
                    <tr key={usuario.id_user}>
                      <td>
                        <div className="usuarios-btn-acciones">
                          <button
                            type="button"
                            title="Editar usuario"
                            className="usuario-btn-editar"
                            onClick={() => abrirEditar(usuario)}
                            disabled={loading}
                          >
                            <i className="bi bi-pencil-square" />
                          </button>

                          <button
                            type="button"
                            title="Eliminar usuario"
                            className="usuario-btn-eliminar"
                            onClick={() =>
                              eliminarUsuario(usuario.id_user!)
                            }
                            disabled={loading}
                          >
                            <i className="bi bi-trash3-fill" />
                          </button>
                        </div>
                      </td>

                      <td>{usuario.id_user}</td>

                      <td>{usuario.nombre_user}</td>

                      <td>
                        <span className={`usuario-rol rol-${usuario.rol}`}>
                          {usuario.rol === "admin"
                            ? "Administrador"
                            : usuario.rol === "empleado"
                              ? "Empleado"
                              : "Usuario"}
                        </span>
                      </td>

                      <td>{usuario.email}</td>

                      <td>{usuario.password}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="usuarios-vacio">
                      <i className="bi bi-people" />
                      <p>No se encontraron usuarios.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          <div className="usuarios-footer">
            <div className="usuarios-mostrar">
              <span>Mostrar</span>

              <SelectBox
                item=""
                dataSource={[
                  { value: "10", label: "10" },
                  { value: "25", label: "25" },
                  { value: "50", label: "50" },
                ]}
                onValueChange={(value) => {
                  setLimite(Number(value));
                  setPagina(1);
                }}
                fontSize={"1.3rem"}
              />

              <span>registros</span>
              <span className="usuarios-total">
                Total: {usuariosFiltrados.length}
              </span>
            </div>

            <div className="usuarios-pagination">
              <button
                type="button"
                disabled={pagina === 1}
                onClick={() => setPagina((p) => p - 1)}
              >
                Anterior
              </button>

              <span className="page-num active">
                {pagina} / {totalPaginas}
              </span>

              <button
                type="button"
                disabled={pagina >= totalPaginas}
                onClick={() => setPagina((p) => p + 1)}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </Card>

      {mostrarPopup && (
        <PopUp
          titulo={usuarioEditando ? "Editar usuario" : "Registrar usuario"}
          onClose={cerrarPopup}
          width="40rem"
          height="30rem"
        >
          <div className="usuarios-form-grid">
            <TextBox
              items={formUsuarios
                .filter((x) => x.key !== "rol")
                .map((x) => ({
                  key: x.key,
                  label: x.label,
                  type: x.type,
                  value: x.value,
                  touched: x.touched,
                  disabled: loading,
                  onValueChange: (newValue: string) =>
                    cambiarCampo(x.key, newValue),
                }))}
              login={false}
              styleComponent={{
                fontFamily: "var(--heading)",
                fontWeight: 700,
                marginTop: 0,
                minWidth: 0,
              }}
              resetKey={0}
              onErrorChange={() => { }}
              fontSize={fontSize}
              labelSize={anchoLabel}
            />

            <div className="usuarios-rol-container">
              <SelectBox
                item="Rol"
                dataSource={[
                  { value: "user", label: "Usuario" },
                  { value: "admin", label: "Administrador" },
                  { value: "empleado", label: "Empleado" },
                ]}
                onValueChange={(value) =>
                  cambiarCampoRol(value as RolUsuario)
                }
                fontSize={fontSize}
                labelSize={anchoLabel}
              />
            </div>

            <div className="usuarios-popup-acciones">
              <Button
                type="button"
                className="usuarios-btn-cancelar"
                onClick={cerrarPopup}
                disabled={loading}
              >
                Cancelar
              </Button>

              <Button
                type="button"
                className="usuarios-btn-guardar"
                disabled={loading}
                onClick={guardarUsuario}
              >
                {loading ? <LoadingSimple /> : "Guardar"}
              </Button>
            </div>
          </div>
        </PopUp>
      )}
    </div>
  );
}
