import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import "./Box.css";
import type { PopUpProps, SelectBoxProps, TextBoxItem, TextBoxProps } from "./ComponentsTypes";

const TextBox = ({ items, login = false, styleComponent, onErrorChange, resetKey, }: TextBoxProps) => {
  const [touched, setTouched] = useState<boolean[]>([]);

  const validatePassword = (password: string): string => {
    if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres";
    if (!/[A-Z]/.test(password)) return "La contraseña debe contener al menos una mayúscula";
    if (!/[0-9]/.test(password)) return "La contraseña debe contener al menos un número";

    return "";
  };

  const esEmailValido = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getError = (item: TextBoxItem): string => {
    if (!item.value?.trim()) return "¡El campo no puede estar vacío!";
    if (item.type === "email" && !esEmailValido(item.value)) return "Ingresa un correo válido";
    if (item.type === "password" && !login) return validatePassword(item.value);

    return "";
  };

  const errors = items.map(item => getError(item));

  useEffect(() => {
    onErrorChange(errors.some(error => error !== ""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, onErrorChange]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTouched(items.map(() => false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  const handleBlur = (index: number) => {
    setTouched(prev => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  return (
    <Form>
      <div
        className="textbox-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "auto minmax(0, 1fr)",
          columnGap: "0.5rem",
          rowGap: "0.35rem",
          alignItems: "center",
          width: "100%",
          marginTop: "1rem",
          ...styleComponent,
        }}
      >
        {items.map((item, index) => (
          <React.Fragment key={item.key ?? index}>
            <Form.Label className="textbox-label">
              {item.label}:
            </Form.Label>

            <Form.Control
              className="textbox-control"
              type={item.type}
              placeholder={item.label}
              value={item.value ?? ""}
              onChange={e => item.onValueChange(e.target.value)}
              onBlur={() => handleBlur(index)}
              isInvalid={!!touched[index] && errors[index] !== ""}
              disabled={item.disabled}
              style={{
                width: "100%",
                minWidth: 0,
                fontSize: "1.3rem",
                borderRadius: "18px",
              }}
            />

            <div style={{ minWidth: 0 }} />

            <div>
              {touched[index] && errors[index] !== "" && (
                <Form.Text className="text-danger">
                  {errors[index]}
                </Form.Text>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </Form>
  );
};

const SelectBox = ({ item, dataSource, onValueChange }: SelectBoxProps) => {
  const [value, setValue] = useState(dataSource[0]?.value ?? "");

  const options = dataSource.map((opc) => ({
    value: opc.value,
    label: opc.label,
  }));

  return (
    <Form.Group className="selectbox-group">
      <Form.Label className="selectbox-label">
        {item}:
      </Form.Label>

      <Select
        className="selectbox-control"
        options={options}
        isSearchable={false}
        styles={{
          menu: base => ({
            ...base,
          }),
          control: (base, state) => ({
            ...base,
            borderRadius: "10px",
            width: "100%",
            borderColor: state.isFocused
              ? "var(--color-focus-box)"
              : "var(--color-box)",
            boxShadow: state.isFocused
              ? "0 0 0 3px var(--color-shadow-box)"
              : "none",
            "&:hover": {
              borderColor: state.isFocused
                ? "var(--color-focus-box)"
                : "var(--color-box)",
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
        value={options.find(opc => opc.value === value)}
        onChange={selected => {
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
          <h2><strong>{titulo}</strong></h2>
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

