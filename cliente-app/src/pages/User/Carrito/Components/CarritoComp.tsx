import type { CSSProperties } from "react";
import { Card } from "../../../../components/Box";
import type { ResumenProps } from "../Types";

const summaryCardStyle: CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid var(--color-borde, #E5D5C5)",
  borderRadius: "1rem",
  padding: "1.75rem",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
  flexShrink: 0,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  position: "sticky",
  top: "2rem",
};

export const Resumen = ({ dataSeleccionada, subtotal, cantidadSeleccionada, onClick }: ResumenProps) => {
  return (
    <Card style={summaryCardStyle} width="35vw" height="auto" classname="cart-summary-card">
      <h2 className="summary-title">
        Resumen del pedido
      </h2>

      <div className="summary-items-list">
        {dataSeleccionada.length === 0 ? (
          <p style={{ fontSize: "0.85rem", color: "var(--color-ink-3, #9E7D76)", fontStyle: "italic", margin: "0.5rem 0" }}>
            Ningún libro seleccionado.
          </p>
        ) : (
          dataSeleccionada.map((item) => (
            <div key={item.nombre} className="summary-item-row">
              <span style={{ 
                overflow: "hidden", 
                textOverflow: "ellipsis", 
                whiteSpace: "nowrap", 
                maxWidth: "65%",
                color: "var(--color-ink-2, #8C7B75)"
              }}>
                {item.nombre}
              </span>
              <span style={{ fontWeight: 600, fontFamily: "Lora, Georgia, serif", color: "var(--color-cafe, #4A2E28)" }}>
                ${item.total.toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>

      <hr className="summary-divider" />

      <div className="summary-row" style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--color-cafe, #4A2E28)" }}>
        <span>Subtotal:</span>
        <span style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.2rem" }}>
          ${(subtotal ?? 0).toFixed(2)}
        </span>
      </div>

      <button
        type="button"
        className="btn-checkout"
        disabled={cantidadSeleccionada === 0}
        onClick={onClick}
      >
        Registrar Orden
      </button>

      <p className="selected-count-text">
        Unidades seleccionadas: {cantidadSeleccionada}
      </p>
    </Card>
  );
};