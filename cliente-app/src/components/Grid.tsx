import { Button, Table } from "react-bootstrap";
import type { GridProps } from "./ComponentsTypes";
import "./Grid.css";


export default function GridUsuarios({ users, editarUser, eliminarUser }: GridProps) {
  return (
    <div className="grid-scroll">
      <div className="grid-inner">
        <Table hover className="grid-table">
          <thead>
            <tr>
              <th className="th-actions">Actions</th>
              <th>ID</th>
              <th>Rol</th>
              <th>Nombre Completo</th>
              <th>Correo Electrónico</th>
              <th className="th-password">Contraseña</th>
            </tr>
          </thead>
          <tbody>
            {users?.map(u => (
              <tr key={u.id_user}>
                <td className="td-actions">
                  <Button className="button-grid" onClick={() => eliminarUser(u.id_user)} title="Eliminar">
                    <i className="bi bi-trash trash" style={{ fontSize: "1.3rem" }} />
                  </Button>
                  <Button className="button-grid" onClick={() => editarUser(u)} title="Editar">
                    <i className="bi bi-pencil-square edit" style={{ fontSize: "1.3rem" }} />
                  </Button>
                  {/* <Button className="button-grid key" onClick={() => verHash?.(u.id_user)} title="Ver hash">
                    <i className="bi bi-key" style={{ fontSize: "1.3rem" }} />
                  </Button> */}
                </td>
                <td>{u.id_user}</td>
                <td>{u.rol}</td>
                <td>{u.nombre_user}</td>
                <td>{u.email}</td>
                <td>{u.password}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}