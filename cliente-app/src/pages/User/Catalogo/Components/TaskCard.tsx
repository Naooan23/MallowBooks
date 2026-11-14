import { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import { Card, LoadingSimple, PopUp } from "../../../../components/Box.tsx";
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

  return (
    <Card
      classname={classname}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        padding: "0",
        cursor: "pointer",
        transition: "transform 0.25s ease",
        backgroundColor: "transparent",
        border: "none",
      }}
      onClick={onClick}
      width={"180px"}
    >
      <div className="book-cover-container">

        <BookCover
          width={CoverWidth}
          heigth={CoverHeigth}
          portada_url={data.portada_url}
          titulo={data.titulo}
        />

        {!isReadOnly && (
          <div
            className={`cart-button ${libroActual?.cantidad === 1
              ? "added"
              : (libroActual?.cantidad ?? 0) > 1
                ? "disable added"
                : sinStock
                  ? "disable"
                  : ""
              }`}
          >
            <i
              className="bi bi-plus"
              onClick={(event) => {
                event.stopPropagation();
                buttonClick();
              }}
            />
          </div>
        )}

      </div>

      <div className="book-info">
        <h2 style={{ fontSize: "1.6rem" }}>
          ${data.precio}
          <small> MXN</small>
        </h2>

        <h3>{data.titulo}</h3>

        <p>{data.autor}</p>
      </div>
    </Card >
  );
}


export function CardLibroDetalle({ data, onClick, CoverWidth, CoverHeigth,isReadOnly = false  }: CardLibroProps) {
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCantidadSeleccionada(libroActual.cantidad);
    } else {
      setCantidadSeleccionada(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [libroActual?.cantidad, data.id]);

  useEffect(() => {
    let activo = true;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarStock(activo);

    return () => {
      activo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.id]);

  return (
    <PopUp titulo={data.titulo} onClose={onClick}>
      <div className="popup-detalle-wrapper">
      <div className="data-book">

        <BookCover
          width={CoverWidth}
          heigth={CoverHeigth}
          portada_url={data.portada_url}
          titulo={data.titulo}
        />

        <p style={{ marginBottom: "0.1rem" }}>
          <strong>Precio:</strong> ${data.precio}
        </p>

        <p>
          <strong>Stock:</strong>{" "}
          {sinStock ? "Agotado" : stock}
        </p>
{!isReadOnly && (
            <>
              <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                <Col xs={3}><strong>Cantidad:</strong></Col>
                <Col xs={9} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  <button className="botones" onClick={() => modificarCantidad(false)} disabled={loading || cantidadActual <= 0}>−</button>
                  <span style={{ textAlign: "center" }}>{cantidadActual}</span>
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

      <div className="book-info">
        <p>
          <strong>Autor:</strong> {data.autor}
        </p>

        <p>
          <strong>Fecha de Publicación:</strong>{" "}
          {data.fecha.getFullYear()}
        </p>

        <p>
          <strong>Sinopsis:</strong>
        </p>

        <textarea disabled value={data.sinopsis} />
      </div>
      {loading && (<LoadingSimple />)}
      </div>
    </PopUp>
  );
}

export function BookCover(data: LibrosCover) {
  const [loading, setLoading] = useState(true);

  return (
    <Card
      style={{
        position: "relative",
        padding: 0,
        gap: 0,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",     // Hereda el alto de la card del carrito (ej. 100% de 120px)
        minHeight: "11rem", // Asegura una altura mínima si el padre es flexible
        overflow: "hidden",
        borderRadius: "0.4rem",
        backgroundColor: "var(--color-blanco)",
      }}
      width={data.width}
      height={data.heigth}
    >
      {loading && <LoadingSimple />}

      <img
        src={data.portada_url}
        alt={`Portada de ${data.titulo}`}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        className={loading ? "imagen-cargando" : ""}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          objectFit: "cover",
          display: "block",
          borderRadius: "0.4rem",
          transition: "opacity 0.2s ease",
        }}
        width="100%"
        height="100%"
      />
    </Card>
  );
}