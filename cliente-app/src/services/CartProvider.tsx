import { useEffect, useState } from "react";
import { Loading } from "../components/Box.js";
import { del, get, post, put } from "../config/api.ts";
import type { ChildrenProp } from "../GeneralTypes.ts";
import { CartContext } from "./CartContext.js";
import { type CarritoCompleto, type DetalleCarrito, type Libros } from "./ServicesTypes.ts";
import { useAuth } from "./useAuth.js";

export const CartProvider = ({ children }: ChildrenProp) => {
  const { user } = useAuth();
  const [carrito, setCarrito] = useState<CarritoCompleto | null>(null);
  const [loading, setLoading] = useState(false);
  const librosCarrito = carrito?.libros ?? [];

  const cantidadTotal = librosCarrito.reduce(
    (total, libro) => total + libro.cantidad,
    0
  );

  const getCarrito = async () => {
    if (!user?.id_user) return;

    setLoading(true);

    try {
      let response = await get("carrito", user.id_user);

      if (response?.id_carrito === null) {
        response = await post("carrito", { id_user: user.id_user });
      }

      setCarrito(response);
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
    setLoading(false);
  };

  const agregarAlCarrito = async (libro: Libros) => {
    if (!carrito) return;

    const existe = librosCarrito.some(x => x.id_book === libro.id);

    if (existe) return;

    setLoading(true);

    try {
      const detalle: DetalleCarrito = {
        id_carrito: carrito.id_carrito,
        id_book: libro.id,
        cantidad: libro.cantidad || 1,
      };

      const response = await post("librosCarrito", detalle);

      const libroCompleto = {
        ...libro,
        ...response,
        id: libro.id,
        id_book: libro.id,
        cantidad: response.cantidad ?? detalle.cantidad,
      };

      actualizarLibrosCarrito(libros => [...libros, libroCompleto]);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const eliminarDelCarrito = async (id_book: number | null) => {
    if (id_book == null) return;

    setLoading(true);

    try {
      await del("librosCarrito", id_book);

      actualizarLibrosCarrito(libros =>
        libros.filter(libro => libro.id_book !== id_book)
      );
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cambiarCantidad = async (id_book: number, cantidad: number) => {
    if (!carrito) return;

    setLoading(true);

    try {
      const response = await put("librosCarrito", {
        id_carrito: carrito.id_carrito,
        id_book,
        cantidad,
      });

      actualizarLibrosCarrito((libros) =>
        libros.map((libro) =>
          libro.id_book === id_book
            ? {
              ...libro,
              ...response,
              id_book,
              cantidad,
            }
            : libro
        )
      );
    } catch (error) {
      console.error(
        "Error al cambiar la cantidad:",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any).response?.data ?? error
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const actualizarStock = (
    id_book: number,
    stock: number
  ) => {
    setCarrito((actual) => {
      if (!actual) return actual;

      return {
        ...actual,
        libros: actual.libros.map((item) =>
          item.id_book === id_book
            ? { ...item, stock }
            : item
        ),
      };
    });
  };

  const actualizarLibrosCarrito = (actualizar: (libros: CarritoCompleto["libros"]) => CarritoCompleto["libros"]) => {
    setCarrito(actual =>
      actual
        ? {
          ...actual,
          libros: actualizar(
            Array.isArray(actual.libros)
              ? actual.libros
              : []
          ),
        }
        : actual
    );
  };

  const vaciarCarrito = async () => {
    const response = await del("librosCarrito", null);
    if (response?.success) {
      getCarrito();
    }
  };


  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (user?.id_user) getCarrito();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id_user]);

  return (
    <CartContext.Provider
      value={{
        librosCarrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        cambiarCantidad,
        vaciarCarrito,
        cantidadTotal,
        actualizarStock
      }}
    >
      {children}
      {loading && <Loading />}
    </CartContext.Provider>
  );
};