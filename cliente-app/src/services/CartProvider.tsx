import { useEffect, useState } from "react";
import { Loading } from "../components/Box.js";
import { del, get, post, put } from "../config/api.ts";
import type { ChildrenProp } from "../GeneralTypes.ts";
import { CartContext } from "./CartContext.js";
import type { Carrito, DetalleCarrito, Libros, LibrosCarritoPost } from "./ServicesTypes.ts";
import { useAuth } from "./useAuth.js";

export const CartProvider = ({ children }: ChildrenProp) => {
  const [carrito, setCarrito] = useState<Carrito | null>();
  const [librosCarrito, setLibrosCarrito] = useState<DetalleCarrito[]>();
  const [loading, setLoading] = useState(false);
  const cantidadTotal = librosCarrito?.length;

  const { user } = useAuth();

  const getCarrito = async () => {
    const response = await get("carrito", user?.id ?? null);
    setCarrito(response);
  };

  const getDetalleCarrito = async () => {
    const response = await get("librosCarrito", carrito?.id_carrito ?? null);
    setLibrosCarrito(response);
  };

  useEffect(() => {
    if (user?.id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      getCarrito();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (carrito?.id_carrito) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      getDetalleCarrito();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carrito]);

  const agregarAlCarrito = async (libro: Libros) => {
    setLoading(true);

    const existe = librosCarrito?.find(
      (x) => x?.id_book === libro.id
    );

    if (!existe || existe == undefined) {
      const libroCarrito: LibrosCarritoPost = {
        id_carrito: carrito?.id_carrito ?? null,
        id_book: libro.id,
        cantidad: libro?.cantidad ?? 0,
      };
      const response = await post("librosCarrito", libroCarrito);

      setLibrosCarrito([
        ...librosCarrito ?? [],
        response
      ])
    }
    setLoading(false);
  };

  const eliminarDelCarrito = async (id_book: number) => {
    setLoading(true);

    const existe = librosCarrito?.find(
      (x) => x.id_book === id_book
    );

    console.log("Nuevo carrito: ", librosCarrito?.filter((x) => x.id_book !== id_book));
    if (existe) {
      await del("librosCarrito", id_book);


      setLibrosCarrito(
        librosCarrito?.filter((x) => x.id_book !== id_book)
      );
    }

    setLoading(false);
  };

  const cambiarCantidad = async (libroActual: Libros) => {
    setLoading(true);
    const response = await put("librosCarrito", libroActual);

    setLibrosCarrito((actual) =>
      actual?.map((x) =>
        x.id_book === libroActual.id
          ? response
          : x
      )
    );

    setLoading(false);
  };


  const vaciarCarrito = () => {
    setCarrito(null);
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        librosCarrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        cambiarCantidad,
        vaciarCarrito,
        cantidadTotal
      }}
    >
      {children}
      {loading && <Loading />}
    </CartContext.Provider>
  );
};