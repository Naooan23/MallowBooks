import { useEffect, useState } from "react";
import { Loading } from "../components/Box.jsx";
import { del, get, post, put } from "../config/api.js";
import { CartContext } from "./CartContext";
import { useAuth } from "./useAuth.jsx";

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(null);
  const [librosCarrito, setLibrosCarrito] = useState([]);
  const [loading, setLoading] = useState(false);
  const cantidadTotal = librosCarrito?.length;

  const { user } = useAuth();

  const getCarrito = async () => {
    const response = await get("carrito", user.id_user);
    setCarrito(response);
  };

  const getDetalleCarrito = async () => {
    const response = await get("librosCarrito", carrito.id_carrito);
    setLibrosCarrito(response);
  };

  useEffect(() => {
    if (user?.id_user) {
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

  const agregarAlCarrito = async (libro) => {
    setLoading(true);

    const existe = librosCarrito.find(
      (x) => x.id_book === libro.id
    );

    if (!existe || existe == undefined) {
      const response = await post("librosCarrito", { id_carrito: carrito.id_carrito, id_book: libro.id, cantidad: libro.cantidad })
      setLibrosCarrito([
        ...librosCarrito,
        response
      ])
    }
    setLoading(false);
  };

  const eliminarDelCarrito = async (id_book) => {
    setLoading(true);

    const existe = librosCarrito.find(
      (x) => x.id_book === id_book
    );

    console.log("Nuevo carrito: ", librosCarrito.filter((x) => x.id_book !== id_book));
    if (existe) {
      await del("librosCarrito", id_book);


      setLibrosCarrito(
        librosCarrito.filter((x) => x.id_book !== id_book)
      );
    }

    setLoading(false);
  };

  const cambiarCantidad = async (libroActual) => {
    setLoading(true);
    const response = await put("librosCarrito", libroActual);

    setLibrosCarrito((actual) =>
      actual.map((x) =>
        x.id_book === libroActual.id_book
          ? response
          : x
      )
    );

    setLoading(false);
  };


  const vaciarCarrito = () => {
    setCarrito([]);
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