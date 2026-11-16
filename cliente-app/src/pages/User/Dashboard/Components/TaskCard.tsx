import { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import { LoadingSimple, PopUp } from "../../../../components/Box";
import { get, put } from "../../../../config/api";
import { useCart } from "../../../../services/CartContext";
import type { LibroCarrito, Libros } from "../../../../services/ServicesTypes";
import "./TaskCard.css";

interface CardLibroProps {
  data: LibroCarrito,
  onClick?: () => void,
  onClose?: () => void,
}

interface BookCoverProps {
  data: Libros,
  onClick?: () => void,
}

export function CardLibro({ data, onClick }: CardLibroProps) {
  const { librosCarrito, agregarAlCarrito, eliminarDelCarrito } = useCart();
  const libroActual = librosCarrito?.find(x => x.id_book == data.id);

  const buttonClick = async () => {
    if (!libroActual) {
      if (data.stock <= 0) return;

      await agregarAlCarrito({
        ...data,
        cantidad: 1,
      });

      await actualizarStock(data.stock - 1);
    }
    else if (libroActual.cantidad === 1) {
      await eliminarDelCarrito(libroActual.id_book);
      await actualizarStock(data.stock + 1);
    }
  };

  const actualizarStock = async (nuevoStock: number) => {
    const libro = await get("libros", data.id);

    libro.stock = nuevoStock;

    await put("libros", libro);
  };

  return (
    <div className="book-card">
      <div className="book-cover-container">

        <BookCover data={data} onClick={onClick} />

        <div
          className={`cart-button 
            ${libroActual?.cantidad === 1
              ? "added"
              : (libroActual?.cantidad ?? 0) > 1
                ? "disable added" : ""
            }`}
        >
          <i
            className="bi bi-plus"
            onClick={buttonClick}
          />
        </div>

      </div>

      <div className="book-info" onClick={onClick}>
        <h3>{data.titulo}</h3>
        <p>{data.autor}</p>
        <hr style={{ color: "grey" }} />
        <h2 style={{ fontSize: "1.6rem" }}>
          ${data.precio}
        </h2>

      </div>
    </div>
  );
}

export function CardLibroDetalle({ data, onClose }: CardLibroProps) {
  const { librosCarrito, agregarAlCarrito, eliminarDelCarrito, cambiarCantidad } = useCart();
  const libroActual = librosCarrito?.find(
    x => x.id_book == data.id && x.cantidad > 0
  );
  const [cantidadActual, setCantidadActual] = useState(libroActual?.cantidad ?? 0);
  const [stock, setStock] = useState(data?.stock ?? 0);
  const estaEnCarrito = !!libroActual;
  const cantidadValida = cantidadActual > 0;
  const sinStock = stock <= 0;
  const botonTexto = sinStock
    ? "Agotado"
    : estaEnCarrito && cantidadValida
      ? "❌ Eliminar del carrito"
      : "🛒 Agregar al carrito";
  const botonClase = sinStock
    ? "button-disabled"
    : estaEnCarrito && cantidadValida
      ? "button-delete"
      : "button-cart";

  const buttonClick = async () => {
    if (!libroActual && cantidadValida) {
      await agregarAlCarrito({
        ...data,
        cantidad: cantidadActual,
      });
    } else if (libroActual) {
      await eliminarDelCarrito(libroActual.id_book);
      await ActualizarStock(stock + cantidadActual);

      setCantidadActual(0);
    }
  };

  const modificarCantidad = async (sumar: boolean) => {
    if (sumar && stock <= 0) return;
    if (!sumar && cantidadActual <= 0) return;

    const nuevaCantidad = sumar
      ? cantidadActual + 1
      : cantidadActual - 1;

    const nuevoStock = sumar
      ? stock - 1
      : stock + 1;

    setCantidadActual(nuevaCantidad);
    setStock(nuevoStock);

    if (nuevaCantidad === 0) {
      if (libroActual) {
        await eliminarDelCarrito(libroActual.id_book);
      }

      await ActualizarStock(nuevoStock);
      return;
    }

    if (libroActual) {
      await ActualizarLibroCarrito(nuevaCantidad);
      await ActualizarStock(nuevoStock);
    }
  };

  const ActualizarLibroCarrito = async (nuevaCantidad: number) => {
    if (libroActual) await cambiarCantidad(libroActual.id_book, nuevaCantidad);
  };

  const ActualizarStock = async (nuevoStock: number) => {
    const libro = await get("libros", data.id);
    libro.stock = nuevoStock;

    setStock(nuevoStock);

    await put("libros", libro);
  };

  const cargarStock = async () => {
    const libro = await get("libros", data.id);

    setStock(libro.stock);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarStock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.id]);

  return (
    <PopUp titulo={data.titulo} onClose={onClose ?? (() => { })}>
      <div className="data-book">
        <BookCover data={data} />

        <p style={{ marginBottom: "0.1rem" }}>
          <strong>Precio:</strong> ${data.precio}
        </p>

        <p>
          <strong>Stock:</strong>{" "}
          {sinStock ? "Agotado" : stock}
        </p>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center"
          }}
        >
          <Col xs={3}>
            <strong>Cantidad:</strong>
          </Col>

          <Col
            xs={9}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px"
            }}
          >
            <Button
              className="botones"
              onClick={() => modificarCantidad(false)}
              disabled={cantidadActual <= 0}
            >
              −
            </Button>

            <span style={{ textAlign: "center" }}>
              {cantidadActual}
            </span>

            <Button
              className="botones"
              onClick={() => modificarCantidad(true)}
              disabled={stock <= 0}
            >
              +
            </Button>
          </Col>
        </div>

        <div className="area-botones">
          <Button
            className={botonClase}
            disabled={sinStock || !cantidadValida}
            onClick={buttonClick}
          >
            <span>{botonTexto}</span>
          </Button>
        </div>
      </div>

      <div className="book-info">
        <p>
          <strong>Autor:</strong> {data.autor}
        </p>

        <p>
          <strong>Fecha de Publicación:</strong> {data.fecha.toString()}
        </p>

        <p>
          <strong>Sinopsis:</strong>
        </p>

        <textarea disabled value={data.sinopsis} />
      </div>
    </PopUp >
  );
}

export function BookCover({ data, onClick }: BookCoverProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="book-cover detalle" onClick={onClick}>
      {loading && <LoadingSimple />}

      <img
        src={data.portada_url}
        alt={`Portada de ${data.titulo}`}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        className={loading ? "imagen-cargando" : ""}
      />
    </div>);
}