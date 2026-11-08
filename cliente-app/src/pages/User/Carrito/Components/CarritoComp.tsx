import { Col } from "react-bootstrap";
import { Card } from "../../../../components/Box";
import type { ResumenProps } from "../Types";

export const Resumen = ({ dataSeleccionada, subtotal, cantidadSeleccionada, onClick }: ResumenProps) => {
  return (
    <Card width="40%" height="auto">
      <h2 className="summary-title">
        Resumen del pedido
      </h2>

      <div className="summary-items-list">
        {dataSeleccionada.map((item) => (
          <div key={item.nombre} className="summary-row">
            <Col>
              <span>{item.nombre}</span>
            </Col>
            <Col xxl={3}>
              <span style={{ marginLeft: "0.5rem" }}>${item.total.toFixed(2)}</span>
            </Col>
          </div>
        ))}
      </div>

      <hr className="summary-divider" />

      <div className="summary-row" style={{ fontWeight: 800 }}>
        <span>Subtotal:</span>
        <span>${(subtotal ?? 0).toFixed(2)}</span>
      </div>

      <button
        type="button"
        className="btn-checkout"
        disabled={cantidadSeleccionada === 0}
        onClick={onClick}
      >
        RegistrarOrden
      </button>

      <p className="selected-count-text">
        Unidades seleccionadas: {cantidadSeleccionada}
      </p>
    </Card>
  );
};