import { useState } from "react";
import type { ChildrenProp } from "../../GeneralTypes";
import { ConfirmContext } from "../../services/ConfirmContext";

export function ConfirmProvider({ children }: ChildrenProp) {
  const [message, setMessage] = useState("");
  const [action, setAction] = useState<(() => void) | null>(null);

  const showConfirm = (message: string, action: () => void) => {
    setMessage(message);
    setAction(() => action);
  };

  const hideConfirm = () => {
    setMessage("");
    setAction(null);
  };

  const handleConfirm = () => {
    action?.();
    hideConfirm();
  };

  return (
    <ConfirmContext.Provider value={{ showConfirm }}>
      {children}

      {message && (
        <div className="overlay">
          <div className="box">

            <div
              className="title"
              style={{ backgroundColor: "var(--color-rojo-brillante)" }}
            >
              <h2 style={{ margin: "0rem" }}>Confirmar eliminación</h2>
            </div>

            <div className="body">
              <p>{message}</p>

              <div className="d-flex gap-2 justify-content-center">
                <button className="info" onClick={hideConfirm}>
                  Cancelar
                </button>

                <button className="error" onClick={handleConfirm}>
                  Eliminar
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}
