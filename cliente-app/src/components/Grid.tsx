import { Button, Table } from "react-bootstrap";
import "../Styles/Grid.css";
import type { GridProps } from "./ComponentsTypes";

function Grid({ users, editarUser, eliminarUser }: GridProps) {
  return (
    <div className="grid-scroll">
      <div className="grid-inner">
        <Table striped hover className="grid-table">
          <thead>
            <tr>
              <th style={{ borderTopColor: "transparent", borderLeft: "none" }}></th>
              <th>ID</th>
              <th>Rol</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th style={{ borderRight: "none" }}>Contraseña</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} >
                <td style={{ display: "flex", alignItems: "center", borderLeft: "none" }}>
                  <Button className={"button-grid trash"} style={{ marginLeft: "0.5rem", marginRight: "0.2rem" }} onClick={() => eliminarUser(u.id)}>
                    <i className="bi bi-trash" style={{ fontSize: "1.5rem" }} />
                  </Button>
                  <Button className={"button-grid edit"} style={{ marginLeft: "0.2rem", marginRight: "0.5rem" }} onClick={() => editarUser(u.id)}>
                    <i className="bi bi-pencil-square" style={{ fontSize: "1.5rem" }} />
                  </Button>
                </td>
                <td className="td-padding">{u.id}</td>
                <td className="td-padding">{u.rol}</td>
                <td className="td-padding">{u.nombre}</td>
                <td className="td-padding">{u.email}</td>
                <td className="td-padding" style={{ borderRight: "none" }}>{u.password}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Grid;