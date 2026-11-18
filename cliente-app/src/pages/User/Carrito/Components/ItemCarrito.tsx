import type { CSSProperties } from "react";
import { Card } from "../../../../components/Box";
import { get, put } from "../../../../config/api";
import { useCart } from "../../../../services/CartContext";
import { BookCover } from "../../Catalogo/Components/TaskCard";
import type { ItemCarritoProps } from "../Types";

const cartItemStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "1.5rem",
  padding: "1.25rem 1.75rem",
  borderRadius: "1rem",
  boxShadow: "0 2px 5px rgba(0,0,0,.03)",
  border: "1px solid var(--color-borde, #EFE4DA)",
  width: "100%",
  boxSizing: "border-box"
};

export default function ItemCarrito({ item, setSeleccionados, librosCarrito, procesandoId, setProcesandoId, seleccionado, procesando }: ItemCarritoProps) {
  const { eliminarDelCarrito, cambiarCantidad, actualizarStock } = useCart();

  const seleccionarLibro = (id_book: number) => {
    setSeleccionados((actuales) =>
      actuales.includes(id_book)
        ? actuales.filter((id) => id !== id_book)
        : [...actuales, id_book]
    );
  };

  const cambiarStock = async (id_book: number, diferencia: number) => {
    const libro = await get("libros", id_book);
    const nuevoStock = libro.stock + diferencia;

    if (nuevoStock < 0) throw new Error("No hay suficiente stock disponible.");

    await put("libros", {
      ...libro,
      stock: nuevoStock,
    });

    actualizarStock(id_book, nuevoStock);

    return nuevoStock;
  };

  const modificarCantidad = async (id_book: number, sumar: boolean) => {
    const item = librosCarrito?.find((libro) => libro.id_book === id_book);

    if (procesandoId !== null || !item || (!sumar && item.cantidad <= 1)) return;

    setProcesandoId(id_book);

    let stockActualizado = false;
    const diferenciaStock = sumar ? -1 : 1;

    try {
      await cambiarStock(id_book, diferenciaStock);
      stockActualizado = true;

      await cambiarCantidad(id_book, sumar ? item.cantidad + 1 : item.cantidad - 1);
    } catch (error) {
      if (stockActualizado) {
        try {
          await cambiarStock(id_book, -diferenciaStock);
        } catch (errorStock) {
          console.error("No se pudo revertir el stock:", errorStock);
        }
      }
      console.log("Error: ", error);
    } finally {
      setProcesandoId(null);
    }
  };

  const eliminarLibro = async (id_book: number) => {
    const item = librosCarrito?.find((libro) => libro.id_book === id_book);

    if (procesandoId !== null || !item) return;

    setProcesandoId(id_book);

    let stockActualizado = false;

    try {
      await cambiarStock(id_book, item.cantidad);
      stockActualizado = true;

      await eliminarDelCarrito(id_book);

      setSeleccionados((actuales) => actuales.filter((id) => id !== id_book));
    } catch (error) {
      if (stockActualizado) {
        try {
          await cambiarStock(id_book, -item.cantidad);
        } catch (errorStock) {
          console.error("No se pudo revertir el stock:", errorStock);
        }
      }

      console.error("Error al eliminar el libro:", error);
    } finally {
      setProcesandoId(null);
    }
  };

  return (
    <Card
      key={item.id_book}
      style={cartItemStyle}
      width="100%"
      height="100%"
      classname="cart-item-card"
    >
      <div className="item-checkbox-container">
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={seleccionado}
          onChange={() => seleccionarLibro(item.id_book)}
          disabled={procesando}
        />
      </div>

      <BookCover width="11rem" heigth="14rem" portada_url={item.portada_url} titulo={item.titulo} />

      <div className="Book-Info" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", gap: "1rem" }}>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", flex: 1, minWidth: 0, gap: "1.5rem" }}>
          <div>
            <h3 className="book-title">{item.titulo}</h3>
            <p className="book-author">{item.autor}</p>
          </div>

        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.75rem", flexShrink: 0, minWidth: "120px" }}>
          <div className="item-price-col" style={{ textAlign: "right" }}>
            <span className="item-total-price">${(item.precio * item.cantidad).toFixed(2)}</span>
            {item.cantidad > 1 && (<span className="item-unit-price">${item.precio} c/u</span>)}
          </div>

          <div className="quantity-controls">

            <button
              type="button"
              className="qty-btn"
              onClick={() => modificarCantidad(item.id_book, false)}
              disabled={
                procesandoId !== null ||
                item.cantidad <= 1
              }
            >
              −
            </button>

            <span className="qty-value">{procesando ? "..." : item.cantidad}</span>

            <button
              type="button"
              className="qty-btn"
              onClick={() => modificarCantidad(item.id_book, true)}
              disabled={
                procesandoId !== null ||
                item.stock <= 0
              }
            >
              +
            </button>
          </div>
        </div>
        <button
          type="button"
          className="btn-icon"
          onClick={() => eliminarLibro(item.id_book)}
          disabled={procesandoId !== null}
          title="Eliminar"
          style={{ width: "fit-content", padding: 0 }}
        >
          <i className="bi bi-trash3-fill button" />
        </button>
      </div>
    </Card>
  );
}