import { useEffect, useState, type CSSProperties } from "react";
import { Col, Form } from "react-bootstrap";
import Select from "react-select";
import "./Box.css";
import type { PopUpProps, SelectBoxProps, TextBoxProps } from "./ComponentsTypes";

const disable: CSSProperties = {
  fontSize: "1.3rem",
  backgroundColor: "var(--color-background)",
  pointerEvents: "none",
  borderRadius: "18px"
};

const TextBox = ({ className, item, login, styleComponent, onValueChange, onErrorChange }: TextBoxProps) => {
  const [touched, setTouched] = useState(false);

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (!hasMinLength) return 'La contraseña debe tener al menos 6 caracteres';
    if (!hasUpperCase) return 'La contraseña debe contener al menos una mayúscula';
    if (!hasNumber) return 'La contraseña debe contener al menos un número';
    return '';
  };

  const esEmailValido = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const showError = () => {
    let response = "";

    if (!item.value?.trim()) response = "¡El campo no puede estar vacío!";
    else if (item.type === "email" && !esEmailValido(item.value)) response = "Ingresa un correo válido";
    else if (item.type === "password" && !login) response = validatePassword(item.value);

    return touched ? response : "";
  };

  const error = showError();

  useEffect(() => {
    onErrorChange(error !== "");
  }, [error, onErrorChange]);

  return (
    <>
      <Form.Group
        className="d-flex flex-column flex-md-row"
        style={{
          alignItems: "center",
          margin: "0rem",
          marginTop: "1rem",
          ...styleComponent
        }}
      >
        <Col
          xs={12}
          md={3}
          style={{
            marginRight: "0.5rem"
          }}
        >
          <Form.Label
            style={{
              marginBottom: 0,
              fontSize: "1.3rem"
            }}
          >
            {item.label}:
          </Form.Label>
        </Col>

        <Col xs={12} md={9}>
          <Form.Control
            style={
              className === "disable"
                ? disable
                : {
                  fontSize: "1.3rem",
                  borderRadius: "18px"
                }
            }
            type={item.type}
            placeholder={item.label}
            value={item.value ?? ""}
            onChange={(e) => onValueChange(e.target.value)}
            onBlur={() => setTouched(true)}
          />
        </Col>
      </Form.Group>

      {error != "" && (
        <Col xs={12} style={{ color: "red", textAlign: "right", paddingRight: "1rem" }}>
          <Form.Text style={{ color: "red" }} >
            {error}
          </Form.Text>
        </Col>
      )}
    </>
  );
};

const SelectBox = ({ item, dataSource, onValueChange }: SelectBoxProps) => {
  const [value, setValue] = useState(dataSource[0]?.value ?? "");

  const options = dataSource.map((opc) => ({
    value: opc.value,
    label: opc.label,
  }));

  return (
    <Form.Group
      style={{
        display: "flex",
        alignItems: "center",
        margin: "1rem",
        marginBottom: 0,
      }}
    >
      <Col xs={3} style={{ marginRight: "0.5rem" }}>
        <Form.Label style={{ marginBottom: 0 }}>
          {item}:
        </Form.Label>
      </Col>

      <Select
        options={options}
        isSearchable={false}
        styles={{
          menu: (base) => ({
            ...base,
          }),

          control: (base, state) => ({
            ...base,
            borderRadius: "10px",
            width: "19.7rem",
            borderColor: state.isFocused ? 'var(--color-focus-box)' : 'var(--color-box)',
            boxShadow: state.isFocused
              ? "0 0 0 3px 'var(--color-shadow-box)'"
              : "none",
            "&:hover": {
              borderColor: state.isFocused ? 'var(--color-focus-box)' : 'var(--color-box)',
            },
          }),

          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "var(--color-selected-box)"
              : "white",
            color: "black",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            "&:hover": {
              backgroundColor: "var(--color-selected-box-hover)",
            },
          }),
        }}
        value={options.find((opc) => opc.value === value)}
        onChange={(selected) => {
          if (!selected) return;

          setValue(selected.value);
          onValueChange(selected.value);
        }}
      />
    </Form.Group>
  );
};

const PopUp = ({ titulo, children, onClose }: PopUpProps) => (
  <div className="detalle-overlay" onClick={onClose}>
    <div className="detalle-modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <div style={{ width: "100%", textAlign: "center" }}>
          <h2>{titulo}</h2>
        </div>
        <button className="no-print" onClick={onClose} aria-label="Cerrar">×</button>
      </div>

      <div className="detalle-content">
        {children}
      </div>
    </div>
  </div>
);

const Loading = () => (
  <div className="loading-overlay">
    <div className="loading-spinner" />
  </div>
);

const LoadingSimple = () => (
  <div className="loading-spinner" />
);

export { Loading, LoadingSimple, PopUp, SelectBox, TextBox };

