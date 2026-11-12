
import { useState } from "react";
import { Dropdown, Form, Table } from "react-bootstrap";
import { LoadingSimple } from "./Box";
import type { GridProps } from "./ComponentsTypes";
import "./Grid.css";

const ROLES = [
  { value: "admin", label: "Administrador" },
  { value: "empleado", label: "Empleado" },
  { value: "user", label: "Usuario" },
];

export default function GridUsuarios({ loading, usuarios, usuariosPagina, abrirEditar, eliminarUsuario }: GridProps) {

  const [rolesSeleccionados, setRolesSeleccionados] = useState<string[]>(
    ROLES.map((rol) => rol.value)
  );

  const cambiarRol = (rol: string) => {
    setRolesSeleccionados((actuales) =>
      actuales.includes(rol)
        ? actuales.filter((r) => r !== rol)
        : [...actuales, rol]
    );
  };

  const usuariosFiltrados = usuariosPagina?.filter((usuario) =>
    rolesSeleccionados?.includes(usuario.rol)
  );

  return (
    <div className="usuarios-grid-container">
      <Table responsive hover className="usuarios-tabla">
        <thead>
          <tr>
            <th>Acciones</th>
            <th>ID</th>
            <th>Nombre</th>

            <th>
              <div className="usuarios-filtro-rol">
                <span>Rol</span>

                <Dropdown autoClose="outside">
                  <Dropdown.Toggle
                    variant="link"
                    className="usuarios-btn-filtro"
                    title="Filtrar por rol"
                  >
                    <i className="bi bi-funnel" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="usuarios-menu-filtro">
                    <div className="usuarios-filtro-titulo">
                      Filtrar por rol
                    </div>

                    {ROLES.map((rol) => (
                      <Dropdown.Item
                        as="div"
                        key={rol.value}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Form.Check
                          type="checkbox"
                          id={`filtro-${rol.value}`}
                          label={rol.label}
                          checked={rolesSeleccionados.includes(rol.value)}
                          onChange={() => cambiarRol(rol.value)}
                        />
                      </Dropdown.Item>
                    ))}

                    <Dropdown.Divider />

                    <Dropdown.Item
                      className="usuarios-filtro-limpiar"
                      onClick={() =>
                        setRolesSeleccionados(ROLES.map((r) => r.value))
                      }
                    >
                      Mostrar todos
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </th>

            <th>Correo electrónico</th>
            <th>Password</th>
          </tr>
        </thead>

        <tbody>
          {loading && usuarios?.length === 0 ?
            (<LoadingSimple />)
            : usuariosFiltrados?.length ?? 0 > 0 ? (
              <TablaGrid loading={loading} usuariosFiltrados={usuariosFiltrados} abrirEditar={abrirEditar} eliminarUsuario={eliminarUsuario} />
            ) : (<GridVacio />)
          }
        </tbody>
      </Table>
    </div>
  );
}

function TablaGrid({ loading, usuariosFiltrados, abrirEditar, eliminarUsuario }: GridProps) {
  return (
    <>
      {usuariosFiltrados?.map((usuario) => (
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
                onClick={() => eliminarUsuario(usuario.id_user!)}
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
      ))}
    </>
  );
}

function GridVacio() {
  return (
    <tr>
      <td colSpan={6} className="usuarios-vacio">
        <i className="bi bi-people" />
        <p>No se encontraron usuarios.</p>
      </td>
    </tr>
  );
}