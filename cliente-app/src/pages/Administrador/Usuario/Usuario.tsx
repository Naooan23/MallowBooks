
import { useEffect, useMemo, useState } from "react";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import { Card, LoadingSimple, PopUp, SelectBox } from "../../../components/Box";
import { del, get, post, put } from "../../../config/api";
import type { UserInfoProps } from "../../User/Perfil/Types";

import { useConfirm, useError } from "../../../services/useAuth";
import "./Usuarios.css";

type RolUsuario = "user" | "admin" | "empleado";

interface UsuarioForm {
  nombre_user: string;
  email: string;
  password: string;
  rol: RolUsuario;
}

const formularioInicial: UsuarioForm = {
  nombre_user: "",
  email: "",
  password: "",
  rol: "user",
};

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<UserInfoProps[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [usuarioEditando, setUsuarioEditando] = useState<UserInfoProps | null>(null);
  const [formulario, setFormulario] = useState<UsuarioForm>(formularioInicial);

  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const [pagina, setPagina] = useState(1);
  const [limite, setLimite] = useState(10);

  const { showConfirm } = useConfirm();
  const { showError } = useError();

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Búsqueda
  const usuariosFiltrados = useMemo(() => {
    const texto = busqueda.toLocaleLowerCase().trim();

    return usuarios.filter((u) =>
      [u.nombre_user, u.email, u.rol].some((valor) =>
        String(valor ?? "").toLocaleLowerCase().includes(texto)
      )
    );
  }, [usuarios, busqueda]);

  // Paginación
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

  // Abrir popup para crear
  const abrirCrear = () => {
    setUsuarioEditando(null);
    setFormulario(formularioInicial);
    setErrores({});
    setMostrarPopup(true);
  };

  // Abrir popup para editar
  const abrirEditar = (usuario: UserInfoProps) => {
    setUsuarioEditando(usuario);

    setFormulario({
      nombre_user: usuario.nombre_user ?? "",
      email: usuario.email ?? "",
      password: "",
      rol: usuario.rol ? (usuario.rol as RolUsuario) : "user",
    });

    setErrores({});
    setMostrarPopup(true);
  };

  const cerrarPopup = () => {
    if (loading) return;

    setMostrarPopup(false);
    setUsuarioEditando(null);
    setFormulario(formularioInicial);
    setErrores({});
  };

  // Actualizar campos
  const cambiarCampo = (campo: keyof UsuarioForm, valor: string) => {
    setFormulario((prev) => ({
      ...prev,
      [campo]: valor,
    }));

    setErrores((prev) => ({
      ...prev,
      [campo]: "",
    }));
  };

  // Validaciones
  const validarFormulario = () => {
    const nuevosErrores: Record<string, string> = {};

    if (!formulario.nombre_user.trim()) {
      nuevosErrores.nombre_user = "Ingresa el nombre del usuario.";
    }

    if (!formulario.email.trim()) {
      nuevosErrores.email = "Ingresa un correo electrónico.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.email)
    ) {
      nuevosErrores.email = "Ingresa un correo electrónico válido.";
    }

    if (!usuarioEditando && !formulario.password.trim()) {
      nuevosErrores.password = "La contraseña es obligatoria.";
    } else if (
      formulario.password &&
      formulario.password.length < 6
    ) {
      nuevosErrores.password =
        "La contraseña debe tener al menos 6 caracteres.";
    } else if (
      formulario.password &&
      !/[A-Z]/.test(formulario.password)
    ) {
      nuevosErrores.password =
        "La contraseña debe contener al menos una mayúscula.";
    } else if (
      formulario.password &&
      !/[0-9]/.test(formulario.password)
    ) {
      nuevosErrores.password =
        "La contraseña debe contener al menos un número.";
    }

    if (!formulario.rol) {
      nuevosErrores.rol = "Selecciona un rol.";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  // Crear o actualizar
  const guardarUsuario = async () => {
    if (!validarFormulario()) return;

    setLoading(true);

    try {
      const usuario: Record<string, unknown> = {
        nombre_user: formulario.nombre_user.trim(),
        email: formulario.email.trim(),
        rol: formulario.rol,
      };

      // No enviar contraseña vacía cuando se está editando.
      if (formulario.password.trim()) {
        usuario.password = formulario.password;
      }

      let response;

      if (usuarioEditando) {
        response = await put(
          "usuarios",
          usuarioEditando.id_user,
          usuario
        );
      } else {
        response = await post("usuarios", usuario);
      }

      await getUsers();

      setMostrarPopup(false);
      setUsuarioEditando(null);
      setFormulario(formularioInicial);
      setErrores({});

      showError({
        success: true,
        message:
          response?.message ||
          (usuarioEditando
            ? "Usuario actualizado correctamente."
            : "Usuario registrado correctamente."),
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error al guardar usuario:", error);

      showError({
        success: false,
        message:
          error?.response?.data?.detail ||
          "No se pudo guardar la información del usuario.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Eliminar con confirmación
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

          {/* ENCABEZADO */}
          <div className="usuarios-header-container">
            <div>
              <h1>Usuarios</h1>
              <span className="usuarios-subtitulo">
                Administración de usuarios registrados
              </span>
            </div>

            <div className="usuarios-acciones-header">
              <InputGroup className="usuarios-search-box">
                <InputGroup.Text className="search-icon-bg">
                  <i className="bi bi-search" />
                </InputGroup.Text>

                <Form.Control
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

          {/* TABLA */}
          <div className="usuarios-tabla-container">
            <Table responsive hover className="usuarios-tabla">
              <thead>
                <tr>
                  <th>Acciones</th>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Rol</th>
                  <th>Password</th>
                  <th>Correo electrónico</th>
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

                      <td>{usuario.password}</td>

                      <td>{usuario.email}</td>
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

      {/* POPUP CREAR / EDITAR */}
      {mostrarPopup && (
        <PopUp
          titulo={usuarioEditando ? "Editar usuario" : "Registrar usuario"}
          onClose={cerrarPopup}
        >
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              guardarUsuario();
            }}
            className="usuarios-formulario"
          >
            <div className="usuarios-form-grid">

              <Form.Group>
                <Form.Label>Nombre del usuario:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre completo"
                  value={formulario.nombre_user}
                  onChange={(e) =>
                    cambiarCampo("nombre_user", e.target.value)
                  }
                  isInvalid={!!errores.nombre_user}
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.nombre_user}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Correo electrónico:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={formulario.email}
                  onChange={(e) =>
                    cambiarCampo("email", e.target.value)
                  }
                  isInvalid={!!errores.email}
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  Contraseña {usuarioEditando && "(opcional)"}
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder={
                    usuarioEditando
                      ? "Dejar vacío para conservar la actual"
                      : "Contraseña"
                  }
                  value={formulario.password}
                  onChange={(e) =>
                    cambiarCampo("password", e.target.value)
                  }
                  isInvalid={!!errores.password}
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.password}
                </Form.Control.Feedback>
              </Form.Group>

              <SelectBox
                item="Rol"
                dataSource={[
                  { value: "user", label: "Usuario" },
                  { value: "admin", label: "Administrador" },
                  { value: "empleado", label: "Empleado" },
                ]}
                onValueChange={(value) =>
                  cambiarCampo("rol", value as RolUsuario)
                }
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
                type="submit"
                className="usuarios-btn-guardar"
                disabled={loading}
              >
                {loading && <LoadingSimple />}
              </Button>
            </div>
          </Form>
        </PopUp>
      )}
    </div>
  );
}
