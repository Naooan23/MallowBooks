import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import "./Box.css";
import type { CardProps, PopUpProps, SelectBoxProps, TextBoxItem, TextBoxProps } from "./ComponentsTypes";

const TextBox = ({ items, login = false, styleComponent, onErrorChange, resetKey, fontSize, labelSize }: TextBoxProps) => {
  const [touched, setTouched] = useState<boolean[]>([]);

  const validatePassword = (password: string): string => {
    if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres";
    if (!/[A-Z]/.test(password)) return "La contraseña debe contener al menos una mayúscula";
    if (!/[0-9]/.test(password)) return "La contraseña debe contener al menos un número";

    return "";
  };

  const esEmailValido = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getError = (item: TextBoxItem): string => {
    const value = String(item.value ?? "");

    if (!value.trim()) return "¡El campo no puede estar vacío!";
    if (item.type === "email" && !esEmailValido(value)) return "Ingresa un correo válido";
    if (item.type === "password" && !login) return validatePassword(value);

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
          gridTemplateColumns: `${labelSize ?? "auto"} minmax(0, 1fr)`,
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
            <Form.Label className="textbox-label"
              style={{
                fontSize: fontSize, fontWeight: "900"
              }}>
              {item.label}:
            </Form.Label>

            <Form.Control
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
                fontSize: fontSize,
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

const TextArea = ({ items, styleComponent, onErrorChange, fontSize }: TextBoxProps) => {
  const [touched, setTouched] = useState<Record<number, boolean>>({});
  const [errors, setErrors] = useState<Record<number, string>>({});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validarCampo = (item: any): string => {
    const value = String(item.value ?? "").trim();

    if (!value) return "¡El campo no puede estar vacío!";

    if (item.type === "number" && Number(value) < 0) {
      return "El valor no puede ser negativo.";
    }

    return "";
  };

  const handleBlur = (index: number) => {
    const error = validarCampo(items[index]);

    setTouched(prev => ({
      ...prev,
      [index]: true,
    }));

    setErrors(prev => ({
      ...prev,
      [index]: error,
    }));
  };

  useEffect(() => {
    const nuevosErrores: Record<number, string> = {};

    items.forEach((item, index) => {
      nuevosErrores[index] = validarCampo(item);
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setErrors(nuevosErrores);

    onErrorChange?.(
      Object.values(nuevosErrores).some(error => error !== "")
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, touched]);

  useEffect(() => {
    const nuevosErrores: Record<number, string> = {};

    items.forEach((item, index) => {
      nuevosErrores[index] = touched[index]
        ? validarCampo(item)
        : "";
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setErrors(nuevosErrores);

    onErrorChange?.(
      Object.values(nuevosErrores).some(error => error !== "")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, touched]);

  return (
    <Form
      style={{
        width: "100%",
        height: "100%",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <div
        style={{
          width: "100%",
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          marginTop: "1rem",
          ...styleComponent,
        }}
      >
        {items.map((item, index) => (
          <React.Fragment key={item.key ?? index}>
            <Form.Label
              style={{
                fontSize,
                fontWeight: "900",
              }}
            >
              {item.label}:
            </Form.Label>

            <Form.Control
              as={item.type === "textarea" ? "textarea" : "input"}
              type={item.type === "textarea" ? undefined : item.type}
              placeholder={item.label}
              value={item.value ?? ""}
              onChange={e => item.onValueChange(e.target.value)}
              onBlur={() => handleBlur(index)}
              isInvalid={!!touched[index] && !!errors[index]}
              disabled={item.disabled}
              style={{
                width: "100%",
                minWidth: 0,
                minHeight: item.type === "textarea" ? 0 : undefined,
                flex: item.type === "textarea" ? "1 1 0" : "none",
                fontSize,
                borderRadius: "18px",
                backgroundColor: "var(--color-blanco)",
                padding: "1rem",
                resize: "none",
              }}
            />

            {!!touched[index] && !!errors[index] && (
              <Form.Text className="text-danger">
                {errors[index]}
              </Form.Text>
            )}
          </React.Fragment>
        ))}
      </div>
    </Form>
  );
};

const SelectBox = ({ item, dataSource, onValueChange, fontSize, labelSize }: SelectBoxProps) => {
  const [value, setValue] = useState(dataSource[0]?.value ?? "");

  const options = dataSource.map((opc) => ({
    value: opc.value,
    label: opc.label,
  }));

  useEffect(() => {
    if (dataSource.length > 0 && !value) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(dataSource[0].value);
      onValueChange(dataSource[0].value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource]);

  return (
    <Form.Group className="selectbox-group">
      <Form.Label
        className="selectbox-label"
        style={{
          width: labelSize,
          fontSize,
          fontWeight: 900,
        }}
      >
        {item}:
      </Form.Label>

      <Select
        className="selectbox-control"
        classNamePrefix="selectbox"
        options={options}
        isSearchable={false}
        menuPosition="absolute"
        menuPlacement="auto"
        menuShouldScrollIntoView={false}
        maxMenuHeight={150}
        styles={{
          menu: base => ({
            ...base,
            zIndex: 1000,
          }),
          menuList: base => ({
            ...base,
            maxHeight: "150px",
            overflowY: "auto",
          }),
          control: (base, state) => ({
            ...base,
            borderRadius: "18px",
            minHeight: "38px",
            fontSize,
            width: "100%",
            borderColor: state.isFocused
              ? "var(--color-rosa-claro)"
              : "var(--color-box)",
            boxShadow: state.isFocused
              ? "0 0 0 3px var(--color-rosa-background)"
              : "none",
          }),
          singleValue: (base) => ({
            ...base,
            fontSize,
          }),
          option: (base, state) => ({
            ...base,
            fontSize,
            backgroundColor: state.isSelected
              ? "var(--color-rosa-claro)"
              : "white",
            color: "black",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          })
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

const PopUp = ({ titulo, children, onClose, width, height }: PopUpProps) => (
  <div className="detalle-overlay" onClick={onClose}>
    <div className="detalle-modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <div style={{ width: "100%", textAlign: "center" }}>
          <h2><strong>{titulo}</strong></h2>
        </div>
        <button className="no-print" onClick={onClose} aria-label="Cerrar">×</button>
      </div>

      <div className="detalle-content" style={{ width: width ?? "50vw", height: height ?? "80vh" }}>
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

const Card = ({ classname, children, width, height, style, onClick }: CardProps) => {
  return (
    <div
      className={`card ${classname}`}
      style={{
        ...style,
        width: width ?? "100%",
        height: height ?? "auto",
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export { Card, Loading, LoadingSimple, PopUp, SelectBox, TextArea, TextBox };

