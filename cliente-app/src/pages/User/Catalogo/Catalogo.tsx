import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Loading } from "../../../components/Box";
import { get } from "../../../config/api";
import type { Libros } from "../../../services/ServicesTypes.ts";
import type { CatalogoContext, LibroAPI } from "./Catalogo.ts";
import { CardLibro, CardLibroDetalle } from "./Components/TaskCard.tsx";

export default function Catalogo() {
  const [loading, setLoading] = useState(false);
  const [libros, setLibros] = useState<Libros[]>([]);
  const [detalleCard, setDetalleCard] = useState<Libros | null>(null);

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
    const busqueda = search.toLowerCase();
    const coincideBusqueda = x.titulo.toLowerCase().includes(busqueda) || x.autor.toLowerCase().includes(busqueda);

    return coincideCategoria && coincideBusqueda;
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="books-grid">
      <div className="books-container">
        {librosFiltrados.map((x) => (
          <CardLibro
            key={x.id}
            classname="card-movement"
            data={x}
            onClick={() => setDetalleCard(x)}
            CoverHeigth="100%"
            CoverWidth="100%"
          />
        ))}
      </div>

      {!loading && librosFiltrados.length === 0 && (
        <div className="empty-catalog-state">
          <i className="bi bi-book" />
          <p>No se encontraron libros disponibles</p>
        </div>
      )}

      {detalleCard !== null && (
        <CardLibroDetalle
          data={detalleCard}
          onClick={() => setDetalleCard(null)}
          CoverHeigth="100%"
          CoverWidth="100%"
        />
      )}

      {loading && <Loading />}
    </div>
  );
}
