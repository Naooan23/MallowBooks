import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { Loading } from "../../../components/Box.tsx";
import { get } from "../../../config/api.ts";
import type { Libros } from "../../../services/ServicesTypes.ts";
import type { CatalogoContext, LibroAPI } from "./CatalogoAdmin.ts";
import { CardLibroAdmin, CardLibroDetalleAdmin, CardNuevoLibroAdmin } from "./Components/TaskCardAdmin.tsx";

export default function CatalogoAdmin() {
  const [loading, setLoading] = useState(false);
  const [libros, setLibros] = useState<Libros[]>([]);
  const [detalleCard, setDetalleCard] = useState<Libros | null>(null);
  const [nuevoLibro, setNuevoLibro] = useState(false);

  const { search, filter } = useOutletContext<CatalogoContext>();

  const getLibros = async () => {
    const response = (await get("libros", undefined)) as LibroAPI[];

    setLibros(
      response.map((x: LibroAPI): Libros => ({
        id: x.id_book,
        id_categoria: x.id_categoria,
        portada_url: x.portada_url,
        titulo: x.titulo,
        autor: x.autor,
        fecha: x.fecha_publicacion != null ? new Date(x.fecha_publicacion) : new Date(),
        sinopsis: x.sinopsis,
        precio: x.precio,
        stock: x.stock,
        cantidad: 0,
      }))
    );
  };

  const cargarDatos = async () => {
    setLoading(true);
    try {
      await getLibros();
    } finally {
      setLoading(false);
    }
  };

  const librosFiltrados = libros.filter((x) => {
    const coincideCategoria = filter === 0 || x.id_categoria === filter;
    const busqueda = (search ?? "").toLowerCase();
    const coincideBusqueda =
      (x.titulo ?? "").toLowerCase().includes(busqueda) ||
      (x.autor ?? "").toLowerCase().includes(busqueda);

    return coincideCategoria && coincideBusqueda;
  });

  const eliminarLibro = async (idLibroEliminado?: number) => {
    if (idLibroEliminado) {
      setLibros(prev => prev.filter(libro => libro.id !== idLibroEliminado));
    }

    setDetalleCard(null);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="books-grid">
      <Row
        style={{ width: "100%", justifyContent: "end" }}
      >
        <button
          className="botones"
          style={{ width: "10rem" }}
          onClick={() => setNuevoLibro(true)}
        >
          + Agregar libro
        </button>
      </Row>
      {nuevoLibro && (
        <CardNuevoLibroAdmin
          CoverHeigth="17rem"
          CoverWidth="11rem"
          onClick={() => setNuevoLibro(false)}
          cargarDatos={cargarDatos}
        />
      )}
      <div className="books-container">
        {librosFiltrados.map((x) => (
          <CardLibroAdmin
            key={x.id}
            classname="card-movement"
            data={x}
            onClick={() => setDetalleCard(x)}
            CoverHeigth="17rem"
            CoverWidth="11rem"
            onDelete={() => eliminarLibro(x.id)}
          />
        ))}
      </div>

      {detalleCard !== null && (
        <CardLibroDetalleAdmin
          data={detalleCard}
          onClick={() => setDetalleCard(null)}
          CoverHeigth="17rem"
          CoverWidth="11rem"
          onDelete={() => eliminarLibro(detalleCard.id)}
        />
      )}

      {loading && <Loading />}
    </div>
  );
}
