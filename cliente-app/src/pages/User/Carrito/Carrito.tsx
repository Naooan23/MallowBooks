import { useMemo, useState } from "react";
import { post } from "../../../config/api";
import { useCart } from "../../../services/CartContext";
import { useAuth } from "../../../services/useAuth";
import "../Catalogo/Components/TaskCard.css";
import { Resumen } from "./Components/CarritoComp";
import ItemCarrito from "./Components/ItemCarrito";
import { OrdenCompra } from "./Components/OrdenCompra";
import type { LibroOrdenVista, Orden, OrdenCompraState } from "./Types";
import "./style.css";

export default function Carrito() {
  const { librosCarrito, eliminarDelCarrito } = useCart();
  const { user } = useAuth();
  const [creandoOrden, setCreandoOrden] = useState(false);
  const [ordenCompra, setOrdenCompra] = useState<OrdenCompraState | null>(null);
  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  const [procesandoId, setProcesandoId] = useState<number | null>(null);

  const subtotal = useMemo(() => {
    return librosCarrito?.filter((item) => seleccionados.includes(item.id_book)).reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );
  }, [librosCarrito, seleccionados]);

  const cantidadSeleccionada = useMemo(() => {
    return librosCarrito?.filter((item) => seleccionados.includes(item.id_book)).reduce((total, item) => total + item.cantidad, 0);
  }, [librosCarrito, seleccionados]);

  const dataSelected = useMemo(() => {
    return librosCarrito
      ?.filter((item) => seleccionados.includes(item.id_book))
      .map((item) => ({
        nombre: item.titulo,
        total: item.precio * item.cantidad,
      })) ?? [];
  }, [librosCarrito, seleccionados]);

  const generarOrden = async () => {
    if (!user?.id_user) {
      alert("Debes iniciar sesión para generar una orden.");
      return;
    }

    const librosSeleccionados = librosCarrito?.filter(
      (item) => seleccionados.includes(item.id_book)
    ) ?? [];

    if (librosSeleccionados.length === 0) {
      alert("Selecciona al menos un libro.");
      return;
    }

    if (procesandoId !== null || creandoOrden) return;

    const datosOrden: Orden = {
      id_user: user.id_user,
      libros: librosSeleccionados.map((item) => ({
        id_book: item.id_book,
        cantidad: item.cantidad,
      })),
    };

    setCreandoOrden(true);

    try {
      const respuesta = await post("ordenes", datosOrden);

      const librosVista: LibroOrdenVista[] = librosSeleccionados.map(
        (item) => ({
          id_book: item.id_book,
          titulo: item.titulo,
          autor: item.autor,
          precio: Number(item.precio),
          cantidad: item.cantidad,
          subtotal: Number(item.precio) * item.cantidad,
        })
      );

      setOrdenCompra({
        orden: {
          id_orden: respuesta.id_orden,
          total: Number(respuesta.total),
          status: respuesta.status,
        },
        libros: librosVista,
        cliente: user.nombre,
        email: user.email,
        fecha: new Date().toLocaleDateString("es-MX"),
      });

      setSeleccionados([]);

      for (const item of librosSeleccionados) {
        console.log(item);
        try {
          await eliminarDelCarrito(item?.id_book);
        } catch (error) {
          console.error(
            `La orden se creó, pero no se pudo retirar el libro ${item.id_book} del carrito:`,
            error
          );
        }
      }
    } catch (error) {
      console.error("Error al crear la orden:", error);
      alert("No se pudo crear la orden de compra.");
    } finally {
      setCreandoOrden(false);
    }
  };

  return (
    <div className="cart-container">
      <h1>Mi Carrito (Cart)</h1>

      <div className="cart-grid">
        <div className="cart-items-list">
          {librosCarrito?.length === 0 ? (<p>Tu carrito está vacío.</p>) : (
            librosCarrito?.map((item) => (
              <ItemCarrito
                key={item.id_book}
                item={item}
                setSeleccionados={setSeleccionados}
                librosCarrito={librosCarrito}
                procesandoId={procesandoId}
                setProcesandoId={setProcesandoId}
                seleccionado={seleccionados.includes(item.id_book)}
                procesando={procesandoId === item.id_book}
              />
            ))
          )}
        </div>

        <Resumen
          dataSeleccionada={dataSelected}
          subtotal={subtotal ?? 0}
          cantidadSeleccionada={cantidadSeleccionada ?? 0}
          onClick={generarOrden}
        />

        {ordenCompra && (
          <OrdenCompra
            orden={ordenCompra.orden}
            libros={ordenCompra.libros}
            cliente={ordenCompra.cliente}
            email={ordenCompra.email}
            fecha={ordenCompra.fecha}
            onClose={() => setOrdenCompra(null)}
          />
        )}
      </div>
    </div >
  );
}