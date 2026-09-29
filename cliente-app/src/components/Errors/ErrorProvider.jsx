import { useEffect, useState } from "react";
import { ErrorContext } from "../../services/useAuth";
import "./ErrorProvider.css";

export function ErrorProvider({ children }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState();

  const showError = (data) => {
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

            <div className="title" style={{ backgroundColor: !success ? "#e62f2f" : "#842fe6" }}>
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