import { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import { LoadingSimple, PopUp } from "../../../../components/Box.tsx";
import { get, put } from "../../../../config/api.ts";
import { useCart } from "../../../../services/CartContext.tsx";
import type { LibroCarrito, LibrosCover } from "../../../../services/ServicesTypes.ts";
import type { CardLibroProps } from "./ComponentsTypes.ts";
import "./TaskCard.css";

export function CardLibro({ data, classname, onClick, CoverWidth, CoverHeigth, isReadOnly = false }: CardLibroProps) {
  const { librosCarrito, agregarAlCarrito, eliminarDelCarrito } = useCart();
  const libroActual = librosCarrito?.find((x: LibroCarrito) => x.id_book == data.id);
  const sinStock = data.stock <= 0;

  const buttonClick = async () => {
    try {
      if (!libroActual) {
        if (data.stock <= 0) return;

        await agregarAlCarrito({
          ...data,
          cantidad: 1,
        });

        await actualizarStock(data.stock - 1);
      } else if (libroActual.cantidad === 1) {
        await eliminarDelCarrito(libroActual.id_book);
        await actualizarStock(data.stock + 1);
      }
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
    }
  };

  const actualizarStock = async (nuevoStock: number) => {
    const libro = await get("libros", data.id);
    libro.stock = nuevoStock;
    await put("libros", libro);
  };

  const precioFormateado = Number(data.precio).toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div
      className={`book-card ${classname ?? ""}`}
      onClick={onClick}
    >
      <div className="book-cover-container">
        <BookCover
          width={CoverWidth ?? "100%"}
          heigth={CoverHeigth ?? "100%"}
          portada_url={data.portada_url}
          titulo={data.titulo}
        />

        {!isReadOnly && (
          <div
            className={`cart-button ${
              libroActual?.cantidad === 1
                ? "added"
                : (libroActual?.cantidad ?? 0) > 1
                  ? "disable added"
                  : sinStock
                    ? "disable"
                    : ""
            }`}
            title={
              libroActual?.cantidad === 1
                ? "En el carrito (clic para quitar)"
                : sinStock
                  ? "Agotado"
                  : "Agregar al carrito"
            }
          >
            <i
              className={libroActual?.cantidad === 1 ? "bi bi-check-lg" : "bi bi-plus"}
              onClick={(event) => {
                event.stopPropagation();
                buttonClick();
              }}
            />
          </div>
        )}
      </div>

      <div className="book-info">
        <h2>
          ${precioFormateado}
          <small> MXN</small>
        </h2>

        <h3 title={data.titulo}>{data.titulo}</h3>

        <p title={data.autor}>{data.autor}</p>
      </div>
    </div>
  );
}

export function CardLibroDetalle({ data, onClick, CoverWidth, CoverHeigth, isReadOnly = false }: CardLibroProps) {
  const { librosCarrito, agregarAlCarrito, eliminarDelCarrito, cambiarCantidad } = useCart();

  const libroActual = librosCarrito?.find(libro => libro.id_book == data.id);

  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(0);
  const [stock, setStock] = useState(data.stock);
  const [loading, setLoading] = useState(false);

  const estaEnCarrito = !!libroActual;
  const cantidadActual = libroActual?.cantidad ?? cantidadSeleccionada;
  const sinStock = stock <= 0;
  const cantidadValida = cantidadActual > 0 && cantidadActual <= stock + (libroActual?.cantidad ?? 0);

  const cambiarStock = async (cantidad: number) => {
    const libro = await get("libros", data.id);
    const nuevoStock = libro.stock + cantidad;

    if (nuevoStock < 0) throw new Error("No hay suficiente stock disponible.");

    libro.stock = nuevoStock;
    await put("libros", libro);

    setStock(nuevoStock);
    return nuevoStock;
  };

  const modificarCantidad = async (sumar: boolean) => {
    if (loading) return;

    const nuevaCantidad = sumar
      ? cantidadActual + 1
      : cantidadActual - 1;

    if (nuevaCantidad < 0) return;

    if (!libroActual) {
      if (sumar && nuevaCantidad > stock) return;

      setCantidadSeleccionada(nuevaCantidad);
      return;
    }

    if (sumar && stock <= 0) return;

    setLoading(true);

    try {
      const cantidadAnterior = libroActual.cantidad;

      if (nuevaCantidad === 0) await eliminarDelCarrito(libroActual.id_book);
      else await cambiarCantidad(data.id, nuevaCantidad);

      const diferenciaStock = cantidadAnterior - nuevaCantidad;

      await cambiarStock(diferenciaStock);

      setCantidadSeleccionada(nuevaCantidad);
    } catch (error) {
      console.error("Error al modificar la cantidad:", error);
    } finally {
      setLoading(false);
    }
  };

  const buttonClick = async () => {
    if (loading) return;

    setLoading(true);

    try {
      if (libroActual) {
        const cantidadAnterior = libroActual.cantidad;

        await eliminarDelCarrito(libroActual.id_book);
        await cambiarStock(cantidadAnterior);

        setCantidadSeleccionada(0);
      } else {
        const cantidad = cantidadSeleccionada;

        if (cantidad <= 0 || cantidad > stock) return;

        await agregarAlCarrito({
          ...data,
          cantidad,
        });

        try {
          await cambiarStock(-cantidad);
          setCantidadSeleccionada(0);
        } catch (error) {
          await eliminarDelCarrito(data.id);
          throw error;
        }
      }
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
    } finally {
      setLoading(false);
    }
  };

  const botonTexto = estaEnCarrito
    ? "❌ Eliminar del carrito"
    : sinStock
      ? "Agotado"
      : "🛒 Agregar al carrito";

  const botonClase = estaEnCarrito
    ? "button-delete"
    : sinStock
      ? "button-cart disable"
      : "button-cart";

  const cargarStock = async (activo: boolean) => {
    try {
      const libro = await get("libros", data.id);

      if (activo) setStock(libro.stock);
    } catch (error) {
      console.error("Error al consultar el stock:", error);
    }
  };

  useEffect(() => {
    if (libroActual) {
      setCantidadSeleccionada(libroActual.cantidad);
    } else {
      setCantidadSeleccionada(0);
    }
  }, [libroActual?.cantidad, data.id]);

  useEffect(() => {
    let activo = true;
    cargarStock(activo);

    return () => {
      activo = false;
    };
  }, [data.id]);

  const anioPublicacion = () => {
    if (!data.fecha) return "No disponible";
    const d = new Date(data.fecha);
    return !isNaN(d.getTime()) ? d.getFullYear() : String(data.fecha);
  };

  const precioFormateado = Number(data.precio).toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <PopUp titulo={data.titulo} onClose={onClick}>
      <div className="popup-detalle-wrapper">
        <div className="data-book">
          <div className="modal-cover-wrap">
            <BookCover
              width={CoverWidth ?? "100%"}
              heigth={CoverHeigth ?? "100%"}
              portada_url={data.portada_url}
              titulo={data.titulo}
            />
          </div>

          <p style={{ marginTop: "0.5rem" }}>
            <strong>Precio:</strong> ${precioFormateado} MXN
          </p>

          <p>
            <strong>Stock:</strong>{" "}
            {sinStock ? <span style={{ color: "var(--color-rojo)", fontWeight: 700 }}>Agotado</span> : stock}
          </p>

          {!isReadOnly && (
            <>
              <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
                <Col xs={4}><strong>Cantidad:</strong></Col>
                <Col xs={8} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  <button className="botones" onClick={() => modificarCantidad(false)} disabled={loading || cantidadActual <= 0}>−</button>
                  <span style={{ textAlign: "center", minWidth: "24px", fontWeight: "700" }}>{cantidadActual}</span>
                  <button className="botones" onClick={() => modificarCantidad(true)} disabled={loading || stock <= 0}>+</button>
                </Col>
              </div>

              <div className="area-botones">
                <Button
                  className={botonClase}
                  disabled={loading || (!estaEnCarrito && (!cantidadValida || sinStock))}
                  onClick={buttonClick}
                >
                  <span>{loading ? "Procesando..." : botonTexto}</span>
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="popup-book-info">
          <p>
            <strong>Autor:</strong> {data.autor}
          </p>

          <p>
            <strong>Fecha de Publicación:</strong> {anioPublicacion()}
          </p>

          <p className="sinopsis-label">
            <strong>Sinopsis:</strong>
          </p>

          <textarea disabled value={data.sinopsis || "Sin sinopsis disponible."} />
        </div>

        {loading && <LoadingSimple />}
      </div>
    </PopUp>
  );
}

export function BookCover(data: LibrosCover) {
  const [loading, setLoading] = useState(true);

  return (
    <div
      className="book-cover"
      style={{
        width: data.width ?? "100%",
        height: data.heigth ?? "100%",
      }}
    >
      {loading && <LoadingSimple />}

      <img
        src={data.portada_url}
        alt={`Portada de ${data.titulo}`}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        className={loading ? "imagen-cargando" : ""}
      />
    </div>
  );
}
