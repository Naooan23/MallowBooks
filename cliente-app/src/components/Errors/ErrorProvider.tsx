import { useEffect, useState } from "react";
import type { ChildrenProp } from "../../GeneralTypes";
import { ErrorContext } from "../../services/useAuth";
import "./ErrorProvider.css";
import type { ErrorData } from "./TypesErrors";

export function ErrorProvider({ children }: ChildrenProp) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<boolean | undefined>();

  const showError = (data: ErrorData) => {
    setError(data.message);
    setSuccess(data.success);
  };

  const hideError = () => {
    setError("");
    setSuccess(undefined);
  };

  useEffect(() => {
    const handleBack = () => {
      if (error) {
        hideError();
      }
    };

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [error]);

  return (
    <ErrorContext.Provider value={{ showError, hideError }}>
      {children}

      {error && (
        <div className="overlay">
          <div className="box">

            <div className="title" style={{ backgroundColor: !success ? "var(--color-rojo-brillante)" : "var(--color-morado)" }}>
              <h2 style={{ margin: "0rem" }}>{!success ? "Error" : "Info"}</h2>
            </div>

            <div className="body">
              <p>{error}</p>

              <button className={!success ? "error" : "info"} onClick={hideError}>Aceptar</button>
            </div>

          </div>
        </div>
      )}
    </ErrorContext.Provider>
  );
}